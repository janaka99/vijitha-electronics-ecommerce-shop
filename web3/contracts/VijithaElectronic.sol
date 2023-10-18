// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract VijithaElectronic {
    string public name;
    address public owner;

    constructor() {
        name = "VijithaElectronic";
        owner = msg.sender;
    }

    event Transfer(address from, address reciever, uint amount);

    struct Order {
        uint256 time;
        string orderId;
        string customer_id;
        address customer_address;
        uint amount;
    }

    Order[] orders;

    //buy products
    function buy(
        string memory _orderId,
        string memory _customer_id
    ) public payable {
        //revieve funds

        //create an order
        Order memory order = Order(
            block.timestamp,
            _orderId,
            _customer_id,
            msg.sender,
            msg.value
        );

        //save order to chain
        orders.push(order);

        //Emit event

        emit Transfer(msg.sender, owner, msg.value);
    }

    //withdraw funds
    // Withdraw funds (only owner can withdraw)
    function withdrawFunds(uint amount) public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        require(
            amount <= address(this).balance,
            "Insufficient contract balance"
        );
        payable(owner).transfer(amount);
    }

    // Get the contract balance (read-only function)
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getOrderByOrderId(
        string memory _order_id
    ) public view returns (Order[] memory) {
        Order[] memory customerOrders = new Order[](orders.length);
        uint256 orderCount = 0;

        for (uint256 i = 0; i < orders.length; i++) {
            if (
                keccak256(abi.encodePacked(orders[i].orderId)) ==
                keccak256(abi.encodePacked(_order_id))
            ) {
                customerOrders[orderCount] = orders[i];
                orderCount++;
            }
        }

        // Resize the array to remove any empty elements
        assembly {
            mstore(customerOrders, orderCount)
        }

        return customerOrders;
    }

    function getAllOrders() public view returns (Order[] memory) {
        return orders;
    }
}
