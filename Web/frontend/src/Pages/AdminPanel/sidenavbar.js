import { Sidenav, Nav } from 'rsuite';
import GroupIcon from '@rsuite/icons/legacy/Group';
import React from "react";
import ReactDOM from 'react-dom';
import HomeIcon from '@rsuite/icons/legacy/Home';
import TreeIcon from '@rsuite/icons/legacy/Tree';
import LeafIcon from '@rsuite/icons/legacy/Leaf';
import HeartIcon from '@rsuite/icons/legacy/Heart';
import '../AdminPanel/adminstyles/adminhome.css'

const panelStyles = {
  padding: '15px 60px',
  textDecoration: 'none',
  color: 'black',
  fontSize: '25px',
  fontWeight: 'bold',
  width: '300px',
  textalign: 'center',
};

const headerStyles = {
  padding: '15px 60px',
  background: '#1a7553',
  color: ' #fff',
  fontFamily: 'papyrus',
  fontWeight: 'bold',
  fontSize: '35px',
  cursor: 'default',
  textalign: 'center',
  width: '300px'
};

const sidenavbar = () => (
  <div style={{ position: 'fixed', left: '0px', width: 300, backgroundColor:'#c8ebd8' }}>
    <Sidenav>
      <Sidenav.Header>
        <div style={headerStyles}>CropsAI</div>

        <div>
          <button className='sidenavbuttons' style={{ width: '300px', height: '80px' }}>
            <a href='/adminhome' style={panelStyles}> {<HomeIcon />} Home</a>
          </button>
        </div>

        <div>
          <button className='sidenavbuttons' style={{ width: '300px', height: '80px' }}>
            <a href='/adminplants' style={panelStyles}> {<TreeIcon />} Plants</a>
          </button>
        </div>

        <div>
          <button className='sidenavbuttons' style={{ width: '300px', height: '80px' }}>
            <a href='/admindiseases' style={panelStyles}>{<LeafIcon />}Diseases</a>
          </button>
        </div>

        <div>
          <button className='sidenavbuttons' style={{ width: '300px', height: '80px' }}>
            <a href='/adminsolutions' style={panelStyles}>{<HeartIcon />} Remedies</a>
          </button>
        </div>

        <div>
          <button className='sidenavbuttons' style={{ width: '300px', height: '80px' }}>
            <a href='/adminuserprofiles' style={panelStyles}>{<GroupIcon />}Profiles</a>
          </button>
        </div>

        <div>
          <button className='sidenavbuttonsblank' style={{ width: '300px', height: '80px' }}>
          </button>
        </div>

        <div>
          <button className='sidenavbuttonsblank' style={{ width: '300px', height: '80px' }}>
          </button>
        </div>

        <div>
          <button className='sidenavbuttonsblank' style={{ width: '300px', height: '80px' }}>
          </button>
        </div>

      </Sidenav.Header>

    </Sidenav>
  </div>
);
ReactDOM.render(<sidenavbar />, document.getElementById('root'));

export default sidenavbar
