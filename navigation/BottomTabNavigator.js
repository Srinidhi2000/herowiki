import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import DetailsScreen from "../screens/Detail";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

class BottomTabNavigator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
data:[],
            fav:[]

        };
        this.favourite=this.favourite.bind(this)
        this.del=this.del.bind(this)
    }


del(e){
        var valuesToRemove=[e]
    var filteredItems = this.state.fav.filter(e => !valuesToRemove.includes(e))
    this.setState({fav:filteredItems})
}

    favourite(e) {
        console.log(this.state.fav)
        var fjoined = this.state.fav.concat(e);

        this.setState({
                loading: false,
                fav: fjoined
            }
        )
        // create a function that saves your data asyncronously

        // as();

    }
    componentDidMount()
    {
        for (var i = 341; i <= 346; i++) {

             fetch(`https://www.superheroapi.com/api.php/1340448086165241/${i}`)
                .then(response => response.json())
                .then((responseJson) => {

                    // console.log(responseJson)
                    var joined = this.state.data.concat(responseJson);

                    this.setState({
                        loading: false,
                        data: joined
                    })
                })


        }

    }








        render() {
            const { navigation, route } = this.props;





  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={ () => <HomeScreen fav={this.favourite} data={this.state.data} favlist={this.state.fav} del={this.del} />}

        options={{
          title: 'HOME',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={()=><LinksScreen favlist={this.state.fav}/> }
        options={{
          title: 'Favourites',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-star" />,
        }}
      />
    </BottomTab.Navigator>
  );}
}
export default BottomTabNavigator
function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'SUPERHEROS';
    case 'Links':
      return 'FAVOURITES';
  }
}
