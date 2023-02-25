// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

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
    mapping (string => mapping(string => string)) private studentData;                          //studentId => (studentDataType => studentData) -- collegeName, collegeId and studentName are default data
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

    //private and hepler function
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

    //Authority auth functions - verifing and giving access to college by authority
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
    
}