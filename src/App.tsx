import React, { lazy, Suspense, createContext, useMemo, useState, Children, useContext } from "react";
//import CounterExample from './CounterExample';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { UserType, childProps, LazyComponent } from './AppTypes/AppTypes';
import './App.scss';

const CounterExamplePreview = lazy(() => import('./CounterExample/CounterExample'));
const PlaceHolderPreview = lazy(() => import('./PlaceHolder/PlaceHolder'));
const EchoHooksPreview = lazy(() => import('./EchoHooks/EchoHooks'));
const EchoPreview = lazy(() => import('./Echo/Echo'));
const ProtoTestPreview = lazy(() => import('./ProtoTest/ProtoTest'));
const CalcPagePreview = lazy(() => import('./CalcPage/CalcPage'));
const GraphDemoPreview = lazy(() => import('./GraphDemo/GraphDemo'));

// All lazy load components for our React Router
const lazyComponents: LazyComponent[] = [
    { name: 'Counter', url: '/index', component: CounterExamplePreview },
    { name: 'Users', url: '/users', component: PlaceHolderPreview },
    { name: 'Calc', url: '/calc', component: CalcPagePreview },
    { name: 'Echo Websocket', url: '/echo', component: EchoHooksPreview },
    { name: 'Echo Websocket Classes', url: '/echoclasses', component: EchoPreview },
    { name: 'Prototype Test', url: '/prototest', component: ProtoTestPreview },
    { name: 'Graph Demo', url: '/graphdemo', component: GraphDemoPreview }
];

// This HOC simply formats the NavLink's for the React Router and displays them at the top of the page and counts them
export const SimpleHOCShowRoutes = ({ children }: childProps) => {

    const minWidth: number = Math.floor(100 / Children.count(children));
    return (
        <>
            <div className='panel' >
                {React.Children.map(children, (child, i) => {
                    return <div style={{ minWidth: `${minWidth}%` }}>
                        <div className="curved-edges panel__items">
                            <strong className='panel__items__text-content' >{i}.</strong>
                            {child}
                        </div>
                    </div>
                })}
                <br /><br />
            </div>

            <div className='panel panel__count' >
                There are {Children.count(children)}: menus
            </div>
        </>

    )
}

// Create a single context for the application
export const UserContext = createContext<UserType>({ name: '', lastName: '' });


// HOC component separates user context from app, so we don't pollute it
const UserContextProvider = ({ children }: childProps) => {
    const [name, setName] = useState<string>("Zvi");
    const [lastName, setLastName] = useState<string>("Dubin");
    const [globalError, setGlobalError] = useState<string>('');


    // useMemo is a Simple optimization that caches values unless name, globalError or lastName changes
    const value =
        useMemo(() => {
            return {
                name,
                lastName,
                globalError,
                setName,
                setLastName,
                setGlobalError
            };
        }, [name, lastName, globalError]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function App() {

    // This is a small demo to show the execution order of promises, timeout etc.
    setTimeout(() => console.log(1), 0);
    console.log(2);
    new Promise<void>(res => {
        console.log(3)
        res();
    }).then(() => console.log(4));
    console.log(5);

    // Use lazyComponents array to construct NavLinks and Routes
    return (
        <Provider store={store}>
            <UserContextProvider>
                <Router>
                    <>
                        <SimpleHOCShowRoutes>
                            {[{ name: 'Home', url: '/' }, ...lazyComponents].map((componentObj,i) =>
                                <NavLink key={`nav-${i}`} to={componentObj.url}>
                                    {componentObj.name}
                                </NavLink>
                            )}
                        </SimpleHOCShowRoutes>
                        <div className='panel' >
                            <Routes>
                                <Route key={`route---0`} path="/" element={
                                    <span>Home Sweet Home...</span>}>
                                </Route>
                                {lazyComponents.map((componentObj,i) =>
                                    <Route path={componentObj.url} element={
                                        <div key={`rou-${i}`} className="App">
                                            <Suspense fallback={<span>Loading...</span>}>
                                                <componentObj.component />
                                            </Suspense>
                                        </div>}>
                                    </Route>
                                )
                                }
                            </Routes>
                        </div>
                    </>
                </Router>
            </UserContextProvider>
        </Provider>
    );
}

export default App;
