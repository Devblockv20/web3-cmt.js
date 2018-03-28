const expect = require("chai").expect
const { Settings, Validators } = require("./constants")
const Utils = require("./global_hooks")

describe.skip("Stake Test", function() {
  beforeEach(function() {
    // unlock accounts
    web3.personal.unlockAccount(accounts[0], Settings.Passphrase)
  })

  describe("Declare Candidacy", function() {
    it("for an existing initial validator account — fail", function() {
      let payload = {
        from: accounts[0],
        pubKey: Validators[0]
      }
      let r = web3.stake.declare(payload)
      expect(r)
        .to.have.property("height")
        .and.to.equal(0)
      expect(r)
        .to.have.property("check_tx")
        .to.have.property("log").and.to.not.empty
    })
    it("Declare candidacy for on new node and the new account A", function() {
      let payload = {
        from: accounts[0],
        pubKey: Validators[0]
      }
      let r = web3.stake.declare(payload)
      expect(r)
        .to.have.property("height")
        .and.to.above(0)
      expect(r)
        .to.have.property("check_tx")
        .to.have.property("log").and.to.be.empty
    })
  })

  describe("Propose Slot", function() {
    it("Candidate node offers a slot", function() {
      let payload = {
        from: accounts[0],
        pubKey: Validators[0],
        amount: 5,
        proposedRoi: 1
      }
      let r = web3.stake.proposeSlot(payload)
      expect(r)
        .to.have.property("height")
        .and.to.above(0)
      expect(r)
        .to.have.property("check_tx")
        .to.have.property("log").and.to.be.empty
    })
  })

  describe("Accept Slot", function() {
    it("Account B stakes candidate — candidate becomes validator, and account A receives block awards", function() {
      let payload = {
        from: accounts[0],
        amount: 5,
        slotId: "slotId"
      }
      let r = web3.stake.acceptSlot(payload)
      expect(r)
        .to.have.property("height")
        .and.to.above(0)
      expect(r)
        .to.have.property("check_tx")
        .to.have.property("log").and.to.be.empty
    })
  })

  describe("Withdraw Slot", function() {
    it("Account B unbind candidate — candidate is no longer a validator", function() {
      let payload = {
        from: accounts[0],
        amount: 5,
        slotId: "slotId"
      }
      let r = web3.stake.withdrawSlot(payload)
      expect(r)
        .to.have.property("height")
        .and.to.above(0)
      expect(r)
        .to.have.property("check_tx")
        .to.have.property("log").and.to.be.empty
    })
  })
})