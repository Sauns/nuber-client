// import { gql } from "@apollo/client";
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css";

import AppPresenter from './AppPresenter'
import { GlobalStyle } from '../../global-styles'
import theme from '../../theme'

const AppContainer: React.FC = () => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppPresenter />
    </ThemeProvider>
    <ToastContainer draggable={true} position={'bottom-center'} />
  </>
)

export default AppContainer
