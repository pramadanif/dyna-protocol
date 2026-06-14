// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/DynaToken.sol";
import "../src/YieldStaking.sol";
import "../src/LPStaking.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy DYNA Token with 10M initial supply
        DynaToken dyna = new DynaToken(10_000_000 * 1e18, deployerAddress);
        
        // 2. Deploy Yield Staking
        YieldStaking yieldStaking = new YieldStaking(address(dyna), address(dyna), deployerAddress);
        
        // 3. Deploy LP Staking (Using DYNA as a mock LP token for now)
        LPStaking lpStaking = new LPStaking(address(dyna), address(dyna), deployerAddress);

        // Optional: Transfer some DYNA to YieldStaking and LPStaking for rewards
        dyna.transfer(address(yieldStaking), 1_000_000 * 1e18);
        dyna.transfer(address(lpStaking), 1_000_000 * 1e18);

        vm.stopBroadcast();

        // Print deployed addresses for backend/frontend integration
        console.log("DynaToken deployed at:", address(dyna));
        console.log("YieldStaking deployed at:", address(yieldStaking));
        console.log("LPStaking deployed at:", address(lpStaking));
    }
}
