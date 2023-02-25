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

    
}