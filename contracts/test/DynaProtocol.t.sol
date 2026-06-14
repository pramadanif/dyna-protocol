// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/DynaToken.sol";
import "../src/YieldStaking.sol";
import "../src/LPStaking.sol";

contract DynaProtocolTest is Test {
    DynaToken public token;
    YieldStaking public yieldStaking;
    LPStaking public lpStaking;

    address public owner;
    address public user1;
    address public user2;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);

        // Initial supply: 10 million tokens
        token = new DynaToken(10_000_000 * 10**18, owner);
        
        yieldStaking = new YieldStaking(address(token), address(token), owner);
        
        // Use token as mock LP token for testing
        lpStaking = new LPStaking(address(token), address(token), owner);

        // Fund users and yield contract
        token.transfer(user1, 1000 * 10**18);
        token.transfer(user2, 1000 * 10**18);
        token.transfer(address(yieldStaking), 100_000 * 10**18);
        token.transfer(address(lpStaking), 100_000 * 10**18);
    }

    function test_TokenMetadata() public {
        assertEq(token.name(), "DYNA");
        assertEq(token.symbol(), "DYNA");
    }

    function test_YieldStaking_Stake() public {
        vm.startPrank(user1);
        token.approve(address(yieldStaking), 100 * 10**18);
        yieldStaking.stake(100 * 10**18);
        
        assertEq(yieldStaking.balanceOf(user1), 100 * 10**18);
        assertEq(yieldStaking.totalSupply(), 100 * 10**18);
        vm.stopPrank();
    }

    function test_YieldStaking_Withdraw() public {
        vm.startPrank(user1);
        token.approve(address(yieldStaking), 100 * 10**18);
        yieldStaking.stake(100 * 10**18);
        yieldStaking.withdraw(50 * 10**18);
        
        assertEq(yieldStaking.balanceOf(user1), 50 * 10**18);
        vm.stopPrank();
    }

    function testFuzz_YieldStaking_Rewards(uint256 stakeAmount, uint256 timePassed) public {
        stakeAmount = bound(stakeAmount, 1, 1000 * 10**18);
        timePassed = bound(timePassed, 1, 365 days);

        vm.startPrank(user1);
        token.approve(address(yieldStaking), stakeAmount);
        yieldStaking.stake(stakeAmount);
        
        vm.warp(block.timestamp + timePassed);
        
        uint256 earned = yieldStaking.earned(user1);
        // rewardRate is 100 by default (wei)
        assertApproxEqAbs(earned, timePassed * 100, 1000);
        vm.stopPrank();
    }

    function test_LPStaking_Rewards() public {
        vm.startPrank(user1);
        token.approve(address(lpStaking), 100 * 10**18);
        lpStaking.stake(100 * 10**18);
        
        vm.warp(block.timestamp + 100); // 100 seconds
        
        uint256 earned = lpStaking.earned(user1);
        // rewardRate is 50 by default for LP staking
        assertEq(earned, 5000); 

        uint256 initialBal = token.balanceOf(user1);
        lpStaking.getReward();
        uint256 finalBal = token.balanceOf(user1);
        
        assertEq(finalBal - initialBal, 5000);
        vm.stopPrank();
    }
}
