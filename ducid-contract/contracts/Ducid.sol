// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/utils/Strings.sol";

//errors
error EmptyDataNotAllowed();

error AccessOnlyToOwner();
error AccessOnlyToNewOwner();
error AccessOnlyToACollege();
error AccessOnlyToVerifiedCollege();

error CollegeNotFound();
error CollegeAlreadyVerified();
error CollegeAlreadyrejected();
error studentIsOfAnotherCollege();

error StudentNotFound();
error NoAccessToEditData();
error DataMissMatching();

error WithdrawUnsuccessfull();

contract Ducid {

    //enums
    enum CollegeStatus {
        ECS_notfound,
        ECS_pending,
        ECS_verified,
        ECS_rejected
    }

    enum StudentStatus {
        ESS_notfound,
        ESS_verified
    }

    enum StudentDataStatus {
        EDS_verified,
        EDS_pending,
        EDS_rejected
    }

    //ownership variables
    address private owner;                                                                      //The adminstraction who have the authority to person to colleges
    // address private newOwner = address(0);                      

    //Data variables                        
    //college variables                     
    mapping (address => string) colleges;                                                       //collegeAddress => collegeId
    string[] collegeIds;                                                                        //array of all college Ids -- including pending and rejected colleges
    mapping (string => CollegeStatus) collegeVerificationStatus;                                //collegeId => college verification status
    mapping (string => mapping(string => string)) private collegeData;                          //collegeId => (dataType => collegeData)
    mapping (string => string[]) collegeDataTypes;                                              //collegeId => array of all data attributes -- collegeName is default data

    //students variables
    mapping (address => string) private students;                                               //studentAddress => studentId
    mapping (string => string[]) private studentIds;                                            //collegeId => allStudentIdsList of that college
    mapping (string => StudentStatus) studentVerificationStatus;                                 //studentId = college verification status
    mapping (string => mapping(string => string)) private studentData;                          //studentId => (studentDataType => studentData) -- collegeId, studentName, studentAge and studentPercentage are default data
    mapping (string => string[]) studentDataTypes;                                              //studentId => AllDatatypes of student data
    //student data access
    mapping (string => mapping(string => bool)) studentDataEditAcess;                           //studentId => (DataType => bool) -- says wether a data is editable a student or not
    mapping (string => mapping(string => StudentDataStatus)) studentDataVerificationStatus;     //studentId => (dataType => dataStatus)
    mapping (string => mapping(string => string)) private studentPendingData;                   //studentId => (pendingDataType => prndingData)

    //thirdparty access variables
    mapping (address => mapping(string => mapping (string => bool))) thirdPartyAccess;                            //thirdPartyAddress => (studentId => (dataType => access))


    //modifiers
    modifier ownerOnly() {
        if(msg.sender != owner) revert AccessOnlyToOwner();
        _;
    }

    modifier collegeOnly() {
        string memory collegeId = colleges[msg.sender];
        if(collegeVerificationStatus[collegeId] == CollegeStatus.ECS_notfound) revert AccessOnlyToACollege();
        if(collegeVerificationStatus[collegeId] != CollegeStatus.ECS_verified) revert AccessOnlyToVerifiedCollege();
        _;
    }

    modifier studentOnly() {
        string memory studentId = students[msg.sender];
        if(studentVerificationStatus[studentId] == StudentStatus.ESS_notfound) revert StudentNotFound();
        _;
    }

    modifier ownCollegeStudent(string calldata studentId) {
        if(studentVerificationStatus[studentId] == StudentStatus.ESS_notfound) revert StudentNotFound();

        string memory collegeId = colleges[msg.sender];
        string memory studentCollegeId = studentData[studentId]["College Id"];
        if(keccak256(abi.encodePacked(collegeId)) != keccak256(abi.encodePacked(studentCollegeId))) revert studentIsOfAnotherCollege();
        _;
    }

    //constructor
    constructor() {
        owner = msg.sender;
    }

    //functions
    //ownership functions
    /**
     * 
     * @dev - uncomment these for ownership changing capability - functionality
     */
    // function giveOwnerShip(address _newOwner) external ownerOnly {
    //     newOwner = _newOwner;
    // }

    // function acceptOwnerShip() external {
    //     if(msg.sender != newOwner) revert AccessOnlyToNewOwner();
    //     owner = newOwner;
    //     newOwner = address(0);
    // }

    //data editing functions
    function editCollegeData(string memory collegeId, string memory dataType, string memory data) private {
        bytes memory _collegeData = bytes(collegeData[collegeId][dataType]);

        if(_collegeData.length == 0)
            collegeDataTypes[collegeId].push(dataType);

        collegeData[collegeId][dataType] = data;
    }

    function editStudentData(string memory studentId, string memory dataType, string memory data) private {
        bytes memory _studentData = bytes(studentData[studentId][dataType]);

        if(_studentData.length == 0)
            studentDataTypes[studentId].push(dataType);

        studentData[studentId][dataType] = data;
    }

    function editStudentDataAccess(string memory studentId, string calldata dataType, StudentDataStatus newDataStatus) private {
        studentDataVerificationStatus[studentId][dataType] = newDataStatus;
    }

    //Authority auth functions
    function approveCollege(string calldata collegeId) external ownerOnly {
        if(collegeVerificationStatus[collegeId] == CollegeStatus.ECS_notfound) revert CollegeNotFound();
        if(collegeVerificationStatus[collegeId] == CollegeStatus.ECS_verified) revert CollegeAlreadyVerified();

        collegeVerificationStatus[collegeId] = CollegeStatus.ECS_verified;
    }

    function rejectCollege(string calldata collegeId) external ownerOnly {
        if(collegeVerificationStatus[collegeId] == CollegeStatus.ECS_notfound) revert CollegeNotFound();
        if(collegeVerificationStatus[collegeId] == CollegeStatus.ECS_rejected) revert CollegeAlreadyrejected();

        collegeVerificationStatus[collegeId] = CollegeStatus.ECS_rejected;
    }

    //college functions
    function addAsCollege(string calldata collegeName) external {
        string memory collegeId = generateId(msg.sender);

        colleges[msg.sender] = collegeId;
        collegeIds.push(collegeId);
        collegeVerificationStatus[collegeId] = CollegeStatus.ECS_pending;

        editCollegeData(collegeId, "College Name", collegeName);
    }

    //college data functions
    function editOwnCollegeData(string calldata dataType, string calldata data) external collegeOnly {
        bytes memory _data = bytes(data);
        if(_data.length == 0) revert EmptyDataNotAllowed();

        string memory collegeId = colleges[msg.sender];
        editCollegeData(collegeId, dataType, data);
    }

    function editStudentDataAsCollege(string calldata studentId, string[] calldata dataTypes, string[] calldata data) external collegeOnly ownCollegeStudent(studentId) {
        if(dataTypes.length != data.length) revert DataMissMatching();

        for(uint i = 0; i < dataTypes.length; i++)
        {
            bytes memory _data = bytes(data[i]);
            if(_data.length == 0) revert EmptyDataNotAllowed();

            editStudentData(studentId, dataTypes[i], data[i]);
        }
    }

    function editStudentDataAccessPermission(string calldata studentId, string calldata dataType, bool access) external collegeOnly ownCollegeStudent(studentId) {
        studentDataEditAcess[studentId][dataType] = access;
    }

    function verifyStudentData(string calldata studentId, string calldata dataType) external collegeOnly ownCollegeStudent(studentId) {
            editStudentDataAccess(studentId, dataType, StudentDataStatus.EDS_verified);
            editStudentData(studentId, dataType, studentPendingData[studentId][dataType]);
    }

    //college auth functions
    function addNewStudent(address studentAddress, string calldata studentName, string calldata studentAge, string calldata studentPercentage) external collegeOnly {
        string memory collegeId = colleges[msg.sender];
        string memory studentId = generateId(studentAddress);

        students[studentAddress] = studentId;
        studentIds[collegeId].push(studentId);
        studentVerificationStatus[studentId] = StudentStatus.ESS_verified;

        editStudentData(studentId, "College Id", collegeId);
        editStudentData(studentId, "Student Name", studentName);
        editStudentData(studentId, "Student Age", studentAge);
        editStudentData(studentId, "Student Percentage", studentPercentage);
    }

    //student functions
    //student data function
    function editStudentDataAsStudent(string[] calldata dataTypes, string[] calldata data) external studentOnly {
        if(dataTypes.length != data.length) revert DataMissMatching();
        string memory studentId = students[msg.sender];

        for(uint i = 0; i < dataTypes.length; i++)
        {
            if(!studentDataEditAcess[studentId][dataTypes[i]]) revert NoAccessToEditData();
            // editStudentData(studentId, dataType, data);
            editStudentDataAccess(studentId, dataTypes[i], StudentDataStatus.EDS_pending);
            studentPendingData[studentId][dataTypes[i]] = data[i];
        }
    }

    //student - thirdparty functions
    function changeThirdPartyAccess(address thirdParty, string[] calldata dataType, bool[] calldata accesses) external studentOnly {
        if(dataType.length != accesses.length) revert DataMissMatching();
        string memory studentId = students[msg.sender];
        for(uint i =0; i < dataType.length; i++)
        {
            thirdPartyAccess[thirdParty][studentId][dataType[i]] = accesses[i];
        }
    }
    function checkAccessToThirdParty(address thirdParty, string calldata studentId, string calldata dataType) view external returns(bool) {
        return thirdPartyAccess[thirdParty][studentId][dataType];
    }

    //helper functions
    function generateId(address user) private view returns(string memory) {        
        return Strings.toHexString(uint256(keccak256( abi.encodePacked(user, block.timestamp, block.difficulty))));
    }

    //getters
    function getOwner() view external returns(address) {  return owner;   }

    function getAllCollegeIds() view external returns(string[] memory) {    return collegeIds;  }
    function getCollegeStudentIds() view external collegeOnly returns(string[] memory) {    return studentIds[colleges[msg.sender]];    }

    function getOwnCollegeId() view external returns(string memory) {   return colleges[msg.sender];    }
    function getOwnStudentId() view external returns(string memory) {   return students[msg.sender];    }

    function getCollegeStatus(string calldata collegeId) view external returns(CollegeStatus) {   return collegeVerificationStatus[collegeId];   }
    function getStudentStatus(string calldata studentId) view external returns(StudentStatus) {   return studentVerificationStatus[studentId];   }

    //imp function getCollegeDataTypes(string calldata collegeId) view external returns(string[] memory) {    return collegeDataTypes[collegeId];    }
    function getStudentDataTypes(string calldata studentId) view external returns(string[] memory) {    return studentDataTypes[studentId];    }

    function getStudentEditAccess(string memory studentId, string memory dataType) view external returns(bool) {    return studentDataEditAcess[studentId][dataType];   }
    function getStudentDataStatus(string calldata studentId, string calldata dataType) view external collegeOnly ownCollegeStudent(studentId) returns(StudentDataStatus) {
        return studentDataVerificationStatus[studentId][dataType];
    }

    function getCollegeData(string calldata collegeId, string calldata dataType) view external returns(string memory) {  return collegeData[collegeId][dataType];  }
    function getStudentData(string calldata studentId, string calldata dataType) view external returns(string memory) {
        if(studentVerificationStatus[studentId] == StudentStatus.ESS_notfound) revert StudentNotFound();
        if(keccak256(abi.encodePacked(students[msg.sender])) != keccak256(abi.encodePacked(studentId)) && !thirdPartyAccess[msg.sender][studentId][dataType]) revert NoAccessToEditData();

        return studentData[studentId][dataType];
    }
    function getStudentDataAsCollege(string calldata studentId, string calldata dataType, bool TypeOfData) view external collegeOnly ownCollegeStudent(studentId) returns(string memory data) {
        //Type of data -- to decide pending or original data to return
        if(TypeOfData)  //original data
            return studentData[studentId][dataType];
        else if(!TypeOfData)  //prnding data
            return studentPendingData[studentId][dataType];
    }

}