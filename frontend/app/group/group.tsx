import logo from './logo.png';

export function Group() {
  const handleCreateGroup = () => {
  
  };

  return (
        <div>
            <div
              style={{
                backgroundColor: 'rgb(0, 191, 99)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 5%'
              }}
            >
              <img
                style={{height: '125px'}}
                src={logo} alt="Logo" 
              />

              <div style={{ display: 'flex', gap: '20px' }}>
                <button>Login</button>
                <button>Sign Up</button>
              </div>
            </div>

            <div
                style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
              <button 
                style={{backgroundColor: 'rgb(0, 191, 99)',
                        margin: '69px',
                        padding: '7px 16px'
                }}
                onClick = {handleCreateGroup}>Create a group</button>
            </div>
            <div>{/*groups*/}

            </div>
        </div>

    )
}