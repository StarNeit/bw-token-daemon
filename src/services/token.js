var Web3 = require('web3');
var contract = require('truffle-contract');
var BWCToken = require('../../build/contracts/BWCToken.json');
var BwcState = require('../models/BwcState');

function token(){
    let l_hardCap, l_totalSupply;

    /**
     *  Get Tokens Info from Smart Contract
     */
    const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/VaxMZqBPDeLCJNBAsNN1"));

    const token = contract(BWCToken);
    token.setProvider(web3.currentProvider);

    token.at(process.env.CONTRACTADDR)
        .then(contract => {
            /**
             *  Getting Hardcap
             */
            contract.hardcap.call()
            .then(hardcap => {
                l_hardCap = parseFloat(hardcap) / 10000;

                /**
                 *  Getting totalSupply
                 */
                contract.totalSupply.call()
                    .then(totalSupply => {
                            l_totalSupply = parseFloat(totalSupply) / 10000;

                        BwcState.remove(function(err,removed) {
                            var bwcState = new BwcState();
                            bwcState.hardCap = l_hardCap;
                            bwcState.totalSupply = l_totalSupply;

                            bwcState.save()
                                .then(bwcStateRecord => {
                                    console.log("[TokenSale Daemon] ", bwcStateRecord);
                                }).catch(err => {
                                    console.log(err.message);
                                });
                        });
                    })
                    .catch(error => {
                            console.log("[totalSupply reading Error] ", error.message);
                    });
            })
            .catch(error => {
                    console.log("[hardcap reading Error] ", error.message);
            });
        })
        .catch(error => {
           console.log("[found error]", error)
        });
}

module.exports = token;