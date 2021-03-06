import React from 'react';
import './App.css';
import {LoginProvider} from "./components/auth/AuthContext";
import AppRouter from "./router/AppRouter";
import {RestaurantsProvider} from "./components/restaurants/RestaurantsContext";
import {ToastProvider} from 'react-toast-notifications';
import {ReservationProvider} from "./components/reservation/ReservationContext";

function App() {
    return (
        <div className="App">
            <ToastProvider placement={"bottom-right"} autoDismiss={true} autoDismissTimeout={3000}>
                <RestaurantsProvider>
                    <LoginProvider>
                        <ReservationProvider>
                            <AppRouter/>
                        </ReservationProvider>
                    </LoginProvider>
                </RestaurantsProvider>
            </ToastProvider>
        </div>
    );
}

export default App;
