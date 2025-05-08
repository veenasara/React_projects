import React,{useEffect,useState} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData } from '../redux/actions';
import columns from './columns';
import UserModal from './Usermodal';

const UserComponent = () => {
 
  const [selectedUser, setSelectedUser] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => {
    console.log("Redux state:", state); 
    return state.users;
  });

  useEffect(() => {
    const fetchUsers = async () => {
    
      try {
        const response = await axios.get('https://dummyjson.com/users');
        const data=response.data.users;
     //console.log('data is',response.data.users);

        data.forEach(user => {
          dispatch(setUserData({
            image:<img src={user.image} alt="placeholder" />,
            firstName: user.firstName,
            lastName:user.lastName,
            age: user.age,
           address: `${user.address.address}, ${user.address.city}`,
           email: user.email,
           phone:user.phone,
           dateOfBirth:user.birthDate,
          
          }));
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  },[dispatch]);

  

return(
  <div border="1" cellPadding="10" style={{ marginTop: "20px", padding: '20px' }}>
      <h2>List of Users</h2>
      <ReactTable
        data={users}
        columns={columns}
        getTrProps={(state, rowInfo) => {
          return {
            onClick: () => {
              if (rowInfo) {
                setSelectedUser(rowInfo.original);
                setIsModalOpen(true);
              }
            },
            style: {
              cursor: 'pointer',
            }
          };
        }}
        defaultPageSize={5}
        pageSizeOptions={[5, 10, 15]}
        className="-striped -highlight"
        
      />
     {isModalOpen && selectedUser && (
        <UserModal onClose={() => setIsModalOpen(false)}>
          <h2>User Details</h2>
          <p><strong>First Name:</strong> {selectedUser.firstName}</p>
          <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
          <p><strong>Age:</strong> {selectedUser.age}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Address:</strong> {selectedUser.address}</p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </UserModal>
      )}
    </div>
);

};
   

export default UserComponent;