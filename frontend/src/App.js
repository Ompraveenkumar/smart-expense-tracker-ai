import React, { useState, useMemo } from 'react'
import styled from "styled-components";
import { MainLayout } from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard'
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses'
import Transactions from './Components/Transactions/Transactions'
import Login from './Components/Auth/Login'
import { useGlobalContext } from './context/globalContext';
import AiChat from './Components/AiChat/AiChat'
import { motion } from "framer-motion";

function App() {
  const [active, setActive] = useState(1)
  const [isOpen, setIsOpen] = useState(true)

  const { user } = useGlobalContext()

  const displayData = () => {
    switch (active) {
      case 1: return <Dashboard />
      case 2: return <Transactions />
      case 3: return <Income />
      case 4: return <Expenses />
      case 5: return <AiChat />
      default: return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  if (!user) {
    return <Login />
  }

  return (
    <AppStyled className="App">
      {orbMemo}

      <MainLayout>
        <NavWrapper isOpen={isOpen}>
          <Navigation active={active} setActive={setActive} />
        </NavWrapper>

        <main>
          <div className="toggle-icon" onClick={() => setIsOpen(!isOpen)}>
            <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ height: '100%' }}
          >
            {displayData()}
          </motion.div>

        </main>
      </MainLayout>
    </AppStyled>
  );
}

const NavWrapper = styled.div`
    height: 100%;
    transition: all 0.4s ease-in-out; 
    /* 👇 FIXED: Width now matches Navigation.js (374px) so it fits perfectly */
    width: ${props => props.isOpen ? '374px' : '0'}; 
    opacity: ${props => props.isOpen ? '1' : '0'};
    overflow: hidden;
    white-space: nowrap;
    
    @media (max-width: 768px) {
        position: absolute;
        z-index: 20;
        background: rgba(252, 246, 249, 0.9);
        height: 95%;
        border-radius: 20px;
        border: 2px solid #fff;
    }
`;

const AppStyled = styled.div`
  height: 100vh;
  position: relative;
  background-color: #0f172a; 
  overflow: hidden; 
  
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.05); 
    border: 3px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    border-radius: 32px;
    overflow-x: hidden;
    position: relative;

    &::-webkit-scrollbar{
      width: 0;
    }

    .toggle-icon{
        position: absolute;
        top: 2rem;
        right: 2rem;
        width: 40px;
        height: 40px;
        
        /* Crystal Glass Toggle */
        background: rgba(255, 255, 255, 0.1); 
        border: 1px solid rgba(255, 255, 255, 0.2); 
        backdrop-filter: blur(10px);
        
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        transition: all 0.3s ease;
        
        &:hover { 
            transform: scale(1.1); 
            background: rgba(255, 255, 255, 0.2);
        }
        
        i{
            font-size: 1.4rem;
            color: #fff; 
        }
    }
  }
`;

export default App;