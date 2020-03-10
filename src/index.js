import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { ProductListProvider } from './contexts/ProductListContext'
import { ProductProvider } from './contexts/ProductContext'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faFrog } from '@fortawesome/free-solid-svg-icons'
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
library.add(faChevronLeft, faFrog)


ReactDOM.render(
	<BrowserRouter>
		<ProductListProvider>
			<ProductProvider>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</ProductProvider>
		</ProductListProvider>
	</BrowserRouter>,
	document.getElementById("root")
);


