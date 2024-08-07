// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BatchExecutor {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    /**
     * @dev Executes a single function on a target address.
     * @param _target The contract address where the function will be called.
     * @param _signature The signature of the function to be executed.
     * @param _data The data to be passed to the function.
     * @return The result of the function execution.
     */
    function execute(
        address _target,
        bytes4 _signature,
        bytes memory _data
    ) internal returns (bytes memory) {
        (bool success, bytes memory result) = _target.call(abi.encodePacked(_signature, _data));
        require(success, "Function execution failed");
        return result;
    }

    /**
     * @dev Executes a batch of functions on target addresses only if the methods are allowed.
     * @param _targets The contract addresses where the functions will be called.
     * @param _signatures The signatures of the functions to be executed.
     * @param _data The data to be passed to the functions.
     * @return _results The result of the function execution.
     */
    function executeBatch(
        address[] memory _targets,
        bytes4[] memory _signatures,
        bytes[] memory _data
    ) external onlyOwner returns (bytes[] memory _results) {
        require(_targets.length > 0, "Targets array cannot be empty");
        require(_signatures.length > 0, "Signatures array cannot be empty");
        require(_data.length > 0, "Data array cannot be empty");
        require(
            _targets.length == _signatures.length &&
            _targets.length == _data.length,
            "Lengths of targets, functions, and data arrays must match"
        );

        _results = new bytes[](_targets.length);

        for (uint256 i = 0; i < _targets.length; i++) {
            _results[i] = execute(_targets[i], _signatures[i], _data[i]);
        }

        return _results;
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a new owner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        owner = newOwner;
    }
}