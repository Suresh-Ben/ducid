import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Ducid from './content/Ducid.json';

function useContract() {

    const [address, SetAddress] = useState(null);
    const [contract, SetContract] = useState(null);
    const [connectionError, SetConnectionError] = useState(null);

    async function connectWallet() {

        let provider = await new ethers.providers.Web3Provider(window.ethereum);

        if (provider) {
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const accountAddress = await signer.getAddress();
            SetAddress(accountAddress);

            const contractAddress = "0x27dbd024E6AF74479f0315972a759f8b2b1EcC49";
            let DucidContract = await new ethers.Contract(
                contractAddress,
                Ducid.abi,
                signer
            );
            SetContract(DucidContract);
        } else
            SetConnectionError("Metamask is not installed or having issue connecting...!!!");
    }

    useEffect(() => {
        connectWallet()
    }, []);

    return { address, contract, connectionError };
}

export default useContract;