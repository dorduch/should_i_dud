import React, {Component} from 'react';
import moment from 'moment';
import {getCloudCoverage, getCoverageLevel, levels} from './services/weather';
import CircularProgress from 'material-ui/CircularProgress';



const styles = {
  container: {
    height: '100vh',
    position: 'relative',
    width: '100vw',
    padding: '25px',
    boxSizing: 'border-box'
  },
  cloudCoverageLabel: {
    fontSize: '20px',
    flexGrow: '1',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
  },
  content: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'white',
  },
  title: {
    fontSize: '30px',
    position: 'absolute',
    top: '25px'
  },
  subtitle: {
    fontSize: '100px',
    fontWeight: 'bold',
    margin: '20px',
    letterSpacing: '2px',
  },
};

class App extends Component {
  state = {
    cloudCoverage: 0,
    loading: true,
    level: levels.default,
  };
  componentDidMount () {
    this.getCloudCoverage ();
  }

  getCloudCoverage = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition (position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getCloudCoverage (
          lat,
          lon,
          moment ().subtract (1, 'days').unix ()
        ).then (coverage =>
          this.setState (
            {cloudCoverage: coverage, loading: false, level: getCoverageLevel(coverage)}
          )
        );
      });
    }
  };

  render () {
    return (
      <div style={{...styles.container, background: this.state.level.color}}>
        <div style={styles.content}>
          <div style={styles.title}>Should i Dud?</div>
          {this.state.loading
            ? <CircularProgress color='white' />
            : <div style={styles.cloudCoverageLabel}>
                <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center'}}>
                  <div style={styles.subtitle}>{this.state.level.label}</div>
                  <div style={{textAlign: 'center'}}
                  >{`Cloud Coverage: ${Math.round (this.state.cloudCoverage * 100)}%`}</div>
                </div>
                <a
                  href="https://darksky.net/poweredby/"
                  style={{fontSize: '8px', position: 'absolute', bottom: '2px'}}
                >
                  Powered by Dark Sky
                </a>
              </div>}
        </div>
      </div>
    );
  }
}

export default App;
