class WorldMap extends React.Component {

  componentDidMount() {
    window.worldMap.draw();
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">Locations</div>
        <div className="panel-body main-map"></div>
      </div>
    );
  }

};

window.WorldMap = WorldMap;
