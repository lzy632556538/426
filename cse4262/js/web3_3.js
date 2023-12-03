import { ethers } from "./ethers-5.2.esm.min.js";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./config.js";

const ethereum = window.ethereum;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

const metamaskBtn = document.querySelector('#metamaskBtn');
const registerBtn = document.querySelector('#registerBtn');
const chargeBtn = document.querySelector('#chargeBtn');
const purchaseBtn = document.querySelector('#purchaseBtn');
const purchaseByPointBtn = document.querySelector('#purchaseByPointBtn');
const processTips = document.querySelector('#processTips');
const GetTokenBlance = document.querySelector('#balanceof');
const returnMusic = document.querySelector('#returnMusic');
function formatAddress(address) {
  return address.slice(0, 6) + '...' + address.slice(-4);
}

// 遍历所有button 置为不可点击状态
function disableAllBtn() {
  const btns = document.querySelectorAll('button');
  btns.forEach((btn) => {
    btn.disabled = true;
  });
  processTips.innerHTML = 'Processing...';
}

// 遍历所有button 置为可点击状态
function enableAllBtn() {
  const btns = document.querySelectorAll('button');
  btns.forEach((btn) => {
    btn.disabled = false;
  });
  processTips.innerHTML = '';
}

// 连接小狐狸钱包
metamaskBtn.addEventListener('click', async (e) => {
  // 连接钱包
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  // 获取钱包地址
  const account = accounts[0];
  // 获取当前网络
  const chainId = await ethereum.request({ method: 'eth_chainId' });
  // 判断只能是 Sepolia 网络
  if (chainId !== '0xaa36a7') {
    alert('Sepolia network Only');
    return;
  }
  // 按钮文字内容变为钱包地址
  metamaskBtn.innerHTML = formatAddress(account);
  // 将已登录钱包地址存入 localStorage
  localStorage.setItem('login_account', account);
});

registerBtn.addEventListener('click', async () => {
  await ethereum.enable();

  disableAllBtn();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  // 调用合约中的 register 方法
  const tx = await contract.register();
  console.log('tx', tx);

  await tx.wait();
  enableAllBtn();
});

chargeBtn.addEventListener('click', async () => {
  await ethereum.enable();
  disableAllBtn();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  // 调用合约中的 charge 方法
  const tx = await contract.charge(localStorage.getItem('login_account'), 1000);
  console.log('tx', tx);
  await tx.wait();
  enableAllBtn();
});

purchaseBtn.addEventListener('click', async () => {
  await ethereum.enable();

  disableAllBtn();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  // 调用合约中的 purchase 方法
  const tx = await contract.purchase(localStorage.getItem('login_account'), 4, 300);
  console.log('tx', tx);
  await tx.wait();
  enableAllBtn();
});

purchaseByPointBtn.addEventListener('click', async () => {
  await ethereum.enable();

  disableAllBtn();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  // 调用合约中的 purchaseByPoint 方法
  const tx = await contract.purchaseByPoint(localStorage.getItem('login_account'), 4, 300);
  console.log('tx', tx);
  await tx.wait();
  enableAllBtn();
});

returnMusic.addEventListener('click', async () => {
  await ethereum.enable();

  disableAllBtn();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  // 调用合约中的 purchase 方法
  const ownerAddress = await contract.owner();
  console.log('owner', ownerAddress);
  console.log('user', localStorage.getItem('login_account'));
  const tx = await contract.safeTransferFrom(localStorage.getItem('login_account'),ownerAddress, 4, 1,[]);;
  console.log('tx', tx);
  await tx.wait();
  enableAllBtn();
});

// 调用合约中的 balanceOf 方法
GetTokenBlance.addEventListener('click', async () => {
  await ethereum.enable();

  disableAllBtn();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const tx = await contract.balanceOf(localStorage.getItem('login_account'), 0);
  const point = await contract.balanceOf(localStorage.getItem('login_account'), 1);
  const token1 = await contract.balanceOf(localStorage.getItem('login_account'), 2);
  const token2 = await contract.balanceOf(localStorage.getItem('login_account'), 3);
  const token3 = await contract.balanceOf(localStorage.getItem('login_account'), 4);
  const numericValue = parseInt(tx._hex, 16);
  const pointnumber = parseInt(point._hex, 16);
  const token1number = parseInt(token1._hex, 16);
  const token2number = parseInt(token2._hex, 16);
  const token3number = parseInt(token3._hex, 16);
  let token = [];
  console.log('balance', numericValue);
  console.log('point', point);
  console.log('token', token1);
  console.log('token', token2);
  console.log('token', token3);
  const balanceDisplay = document.getElementById('balanceDisplay');
  const pointDisplay = document.getElementById('pointDisplay');
  const tokenDisplay = document.getElementById('tokenDisplay');
  if (token1number == 1){
    token.push("music1");
  }
  if (token2number == 1){
    token.push("music2");
  }
  if (token3number == 1){
    token.push("music3");
  }
  // 设置span元素的textContent或innerHTML为获取到的balance值
  balanceDisplay.textContent = `Balance: ${numericValue}`;
  pointDisplay.textContent = `point: ${pointnumber}`;
  tokenDisplay.textContent = `token: ${token}`;

  enableAllBtn();

});

