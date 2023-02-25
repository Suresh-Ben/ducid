const { expect } = require('chai');

describe("Ducid", () => {

    beforeEach(async() => {
        DucidContract = await ethers.getContractFactory("Ducid");
        [owner, newOwner, college1, college2, college3, student1, student2, student3, thirdParty1, thirdParty2, user1, user2, user3, ...users] = await ethers.getSigners();

        contract = await DucidContract.deploy();
    });

    describe("Deploy tests", () => {
        it("owner - authority test", async() => {
            let contractOwner = await contract.getOwner();
            expect(owner.address).to.equal(contractOwner);
        });
    });

    describe("Authority tests", () => {
        it("owner access test", async() => {
            await expect(contract.connect(user1).approveCollege("ThisIsJustATempId")).to.be.revertedWith('AccessOnlyToOwner');

        });

        /**
         * @dev -- ownership exchange cfunctionality tests
         */
        // it("passing authority test", async() => {
        //     await contract.giveOwnerShip(newOwner.address);
        //     await contract.connect(newOwner).acceptOwnerShip();

        //     let contractOwner = await contract.getOwner();
        //     expect(newOwner.address).to.equal(contractOwner);
        // });

        // it("newOwner accepting test", async() => {
        //     await contract.giveOwnerShip(newOwner.address);
        //     await expect(contract.connect(user1).acceptOwnerShip()).to.be.revertedWith('AccessOnlyToNewOwner');
        // });
    });

    describe("College joining tests", () => {
        it("college seeking to join test", async() => {
            await contract.connect(college1).addAsCollege("NIT Jalandhar");
            let college1Id = await contract.connect(college1).getOwnCollegeId();
            expect(college1Id).to.not.equal('');

            let college2Id = await contract.connect(college2).getOwnCollegeId();
            expect(college2Id).to.equal('');

            let allCollegeIds = await contract.getAllCollegeIds();
            expect(allCollegeIds).to.contains(college1Id);
            expect(allCollegeIds).to.not.contains(college2Id);
        });

        it("autority accepting college test", async() => {
            let randomcollegeStatus = await contract.getCollegeStatus("randomCollegeId");
            expect(randomcollegeStatus).to.equal(0); //not found

            await contract.connect(college1).addAsCollege("NIT Jalandhar");
            let college1Id = await contract.connect(college1).getOwnCollegeId();
            let college1Status = await contract.getCollegeStatus(college1Id);
            expect(college1Status).to.equal(1); //pending

            await contract.approveCollege(college1Id);
            college1Status = await contract.getCollegeStatus(college1Id);
            expect(college1Status).to.equal(2); //accepted

            await contract.rejectCollege(college1Id);
            college1Status = await contract.getCollegeStatus(college1Id);
            expect(college1Status).to.equal(3); //rejection
        });
    });

    describe("College data tests", () => {
        it("default data test", async() => {
            await contract.connect(college1).addAsCollege("NIT Jalandhar");
            let college1Id = await contract.connect(college1).getOwnCollegeId();
            let collegeName = await contract.getCollegeData(college1Id, "College Name");

            expect(collegeName).to.equal("NIT Jalandhar");
            let collegeDataTypes = await contract.getCollegeDataTypes(college1Id);
            expect(collegeDataTypes).to.contains('College Name');
        });

        it("adding new data test", async() => {
            await contract.connect(college1).addAsCollege("NIT Jalandhar");
            let college1Id = await contract.connect(college1).getOwnCollegeId();
            await contract.approveCollege(college1Id);

            await contract.connect(college1).editOwnCollegeData("Contact Number", "8074743084");
            let collegePhoneNumebr = await contract.getCollegeData(college1Id, "Contact Number");

            expect(collegePhoneNumebr).to.equal("8074743084");
            let collegeDataTypes = await contract.getCollegeDataTypes(college1Id);
            expect(collegeDataTypes).to.contains('College Name', 'Contact Number');
        });

        it("editing data test", async() => {
            await contract.connect(college1).addAsCollege("NIT Jalandhar");
            let college1Id = await contract.connect(college1).getOwnCollegeId();
            await contract.approveCollege(college1Id);

            await contract.connect(college1).editOwnCollegeData("Contact Number", "8074743084");
            await contract.connect(college1).editOwnCollegeData("Contact Number", "8795456555");

            let collegePhoneNumebr = await contract.getCollegeData(college1Id, "Contact Number");
            expect(collegePhoneNumebr).to.equal("8795456555");
        });

        it("empty data error test", async() => {
            await contract.connect(college1).addAsCollege("NIT Jalandhar");
            let college1Id = await contract.connect(college1).getOwnCollegeId();
            await contract.approveCollege(college1Id);

            await expect(contract.connect(college1).editOwnCollegeData("Contact Number", "")).to.be.revertedWith('EmptyDataNotAllowed');
        });
    });

    describe("Stdent adding and data tests", () => {
        it("adding student as college test", async() => {
            await contract.connect(college1).addAsCollege("NIT Jalandhar");
            let college1Id = await contract.connect(college1).getOwnCollegeId();
            await contract.approveCollege(college1Id);

            await contract.connect(college1).addNewStudent(student1.address, "Sureh Bennabatthula", "18", "958");
            let student1Id = await contract.connect(student1).getOwnStudentId();
            expect(student1Id).to.not.equal('');

            let college1StudentsList = await contract.connect(college1).getCollegeStudentIds();
            expect(college1StudentsList).to.contains(student1Id);
        });

        it("student data editing as college test", async() => {
            await contract.connect(college1).addAsCollege("NIT Jalandhar");
            let college1Id = await contract.connect(college1).getOwnCollegeId();
            await contract.approveCollege(college1Id);

            await contract.connect(college2).addAsCollege("NIT Warangal");
            let college2Id = await contract.connect(college2).getOwnCollegeId();
            await contract.approveCollege(college2Id);

            await contract.connect(college1).addNewStudent(student1.address, "Sureh Bennabatthula", "18", "958");
            let student1Id = await contract.connect(student1).getOwnStudentId();

            await contract.connect(college1).editStudentDataAsCollege(student1Id, ["Contact Number"], ["999 804 754"]);
            let student1DataTypes = await contract.getStudentDataTypes(student1Id);
            expect(student1DataTypes).to.contains('College Id', 'Student Name', 'Student Age', 'Student Percentage', 'Contact Number');

            await contract.connect(college1).editStudentDataAsCollege(student1Id, ["Contact Number"], ["784578965"]);
            let student1ContactNumber = await contract.connect(college1).getStudentDataAsCollege(student1Id, "Contact Number", 1);
            expect(student1ContactNumber).to.equal("784578965");

            await expect(contract.connect(college2).editStudentDataAsCollege(student1Id, ["Contact Number"], ["7845858965"])).to.be.revertedWith('studentIsOfAnotherCollege');
            await expect(contract.connect(college2).getStudentDataAsCollege(student1Id, "Contact Number", 1)).to.be.revertedWith('studentIsOfAnotherCollege');
        });

        it("student data editing access and editing as student test", async() => {
            await contract.connect(college1).addAsCollege("NIT Jalandhar");
            let college1Id = await contract.connect(college1).getOwnCollegeId();
            await contract.approveCollege(college1Id);

            await contract.connect(college1).addNewStudent(student1.address, "Sureh Bennabatthula", "18", "958");
            let student1Id = await contract.connect(student1).getOwnStudentId();

            await contract.connect(college1).editStudentDataAsCollege(student1Id, ["Contact Number"], ["784578965"]);
            let student1ContactNumber = await contract.connect(college1).getStudentDataAsCollege(student1Id, "Contact Number", 1);
            expect(student1ContactNumber).to.equal("784578965");

            let student1ContactNoEditAccess = await contract.getStudentEditAccess(student1Id, "Contact Number");
            expect(student1ContactNoEditAccess).to.equal(false);

            await expect(contract.connect(student1).editStudentDataAsStudent(["Contact Number"], ["89547554"])).to.be.revertedWith('NoAccessToEditData');

            await contract.connect(college1).editStudentDataAccessPermission(student1Id, "Contact Number", true);
            student1ContactNoEditAccess = await contract.getStudentEditAccess(student1Id, "Contact Number");
            expect(student1ContactNoEditAccess).to.equal(true);

            await contract.connect(student1).editStudentDataAsStudent(["Contact Number"], ["89547554"]);
            student1ContactNumber = await contract.connect(college1).getStudentDataAsCollege(student1Id, "Contact Number", 1);
            expect(student1ContactNumber).to.equal("784578965");
            let pendingStudent1ContactNumber = await contract.connect(college1).getStudentDataAsCollege(student1Id, "Contact Number", 0);
            expect(pendingStudent1ContactNumber).to.equal("89547554");

            await contract.connect(college1).verifyStudentData(student1Id, "Contact Number");
            student1ContactNumber = await contract.connect(college1).getStudentDataAsCollege(student1Id, "Contact Number", 1);
            expect(student1ContactNumber).to.equal("89547554");
        });
    });

    describe("Third party tests", () => {
        it("third paty access test", async() => {
            await contract.connect(college1).addAsCollege("NIT Jalandhar");
            let college1Id = await contract.connect(college1).getOwnCollegeId();
            await contract.approveCollege(college1Id);

            await contract.connect(college1).addNewStudent(student1.address, "Sureh Bennabatthula", "18", "958");
            let student1Id = await contract.connect(student1).getOwnStudentId();

            await contract.connect(college1).editStudentDataAsCollege(student1Id, ["Contact Number"], ["784578965"]);
            let student1ContactNumber = await contract.connect(college1).getStudentDataAsCollege(student1Id, "Contact Number", 1);
            expect(student1ContactNumber).to.equal("784578965");

            await expect(contract.getStudentData(student1Id, "Contact Number")).to.be.revertedWith('NoAccessToEditData');
        });

        it("giving and revoking view access to third party test", async() => {
            await contract.connect(college1).addAsCollege("NIT Jalandhar");
            let college1Id = await contract.connect(college1).getOwnCollegeId();
            await contract.approveCollege(college1Id);

            await contract.connect(college1).addNewStudent(student1.address, "Sureh Bennabatthula", "18", "958");
            let student1Id = await contract.connect(student1).getOwnStudentId();

            await contract.connect(college1).editStudentDataAsCollege(student1Id, ["Contact Number"], ["784578965"]);
            let student1ContactNumber = await contract.connect(college1).getStudentDataAsCollege(student1Id, "Contact Number", 1);
            expect(student1ContactNumber).to.equal("784578965");

            let thirdParty1ContactNoAccess = await contract.checkAccessToThirdParty(thirdParty1.address, student1Id, "Contact Number");
            expect(thirdParty1ContactNoAccess).to.equal(false);

            await contract.connect(student1).giveAccessToThirdParty(thirdParty1.address, "Contact Number");

            thirdParty1ContactNoAccess = await contract.checkAccessToThirdParty(thirdParty1.address, student1Id, "Contact Number");
            expect(thirdParty1ContactNoAccess).to.equal(true);

            await contract.connect(student1).revokeAccessToThirdParty(thirdParty1.address, "Contact Number");

            thirdParty1ContactNoAccess = await contract.checkAccessToThirdParty(thirdParty1.address, student1Id, "Contact Number");
            expect(thirdParty1ContactNoAccess).to.equal(false);
        });
    });
});