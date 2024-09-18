
var getMood
var setMood


import {
    createWalletClient,
    custom,
    getContract,
} from "https://esm.sh/viem";
import { sepolia } from "https://esm.sh/viem/chains"

const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum),
});

const accounts = await walletClient.requestAddresses();

const [address] = accounts;

const MoodContractAddress = "0xA750e32f091E6dD1f9c4542524344d8FC5592d8F"
const MoodContractABI = [
{
"inputs": [
{
    "internalType": "string",
    "name": "_mood",
    "type": "string"
}
],
"name": "setMood",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "getMood",
"outputs": [
{
    "internalType": "string",
    "name": "",
    "type": "string"
}
],
"stateMutability": "view",
"type": "function"
}
];

const MoodContractInstance = getContract({
address: MoodContractAddress,
abi: MoodContractABI,
client: walletClient,
});

getMood = async function() {
const mood = await MoodContractInstance.read.getMood();
document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
}
setMood = async function() {
const mood = document.getElementById("mood").value;
await MoodContractInstance.write.setMood([mood], {
account:address
});
}
