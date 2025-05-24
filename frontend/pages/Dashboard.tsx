import WalletStatus from '../components/WalletStatus';
import SendForm from '../components/SendForm';

const Dashboard = () => (
  <div>
    <h2>CryptoBlink Dashboard</h2>
    <WalletStatus />
    <SendForm />
  </div>
);

export default Dashboard;
