import {useLocation, useNavigate, useParams,} from "react-router-dom";
import React from "react";

function WithRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}/>
        );
    }

    return ComponentWithRouterProp;
}

export default WithRouter;