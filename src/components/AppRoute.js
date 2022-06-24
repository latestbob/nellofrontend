import React from 'react';
import { Redirect, Route, useRouteMatch, useLocation } from 'react-router-dom';
import AppContext from './../context';

const AppRoutes = ({ component: Component, path, auth, exact, pageTitle, ...rest }) => {
	const { dispatch, userToken, setPageTitle, setCurrentPath } = React.useContext(AppContext);
	let loginMatch = useRouteMatch("/login");
	let { pathname } = useLocation();
	const [baseTitle] = React.useState(process.env.REACT_APP_TITLE);

	React.useEffect(() => {
		document.title = `${pageTitle && `${pageTitle} - `}${baseTitle}`;
		setPageTitle(dispatch, pageTitle);
		setCurrentPath(dispatch, pathname);
		return () => {
			document.title = baseTitle;
			setPageTitle(dispatch, baseTitle);
		}
	}, [pathname]);

	return (
		<Route
			exact={exact}
			path={path}
			render={(props) =>
				auth && !Boolean(userToken) ? (
					<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
				) : (<>
					{loginMatch && Boolean(userToken) ?
						(<Redirect to={{ pathname: '/' }} />) :
						(<Component {...props} />)}
				</>)
			}
			{...rest}
		/>
	);
};

export default AppRoutes;
