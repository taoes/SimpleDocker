import React from "react";
import {GetDockerInfo} from '../../api/Info/Info'
import DockerVersionDescription from "../../component/App/Home/DockerVersionDescription";
import DockerServerInfo from "../../api/Model/DockerInfo";
import DockerInfoDescription from "../../component/App/Home/DockerInfoDescription";
import SimpleDockerVersionDescription
  from "../../component/App/Home/SimpleDockerVersionDescription";

interface HomePageProps {
}

interface HomePageState {
  dockerServiceInfo: DockerServerInfo
}


class HomePage extends React.Component<HomePageProps, HomePageState> {

  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      dockerServiceInfo: {version: null, info: null}
    }
  }

  componentDidMount() {
    GetDockerInfo().then(data => {
      this.setState({dockerServiceInfo: data})
    })
  }


  render() {
    return (
        <div id="homePage">
          <DockerVersionDescription dockerInfo={this.state.dockerServiceInfo}/>
          <DockerInfoDescription dockerInfo={this.state.dockerServiceInfo}/>
          <SimpleDockerVersionDescription/>
        </div>
    )
  }

}

export default HomePage;