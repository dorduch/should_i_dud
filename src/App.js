import React, {Component} from 'react';
import moment from 'moment';
import {getUvIndex, getUvIndexLevel, levels} from './services/weather';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  container: {
    height: '100vh',
    position: 'relative',
    width: '100vw',
    padding: '25px',
    boxSizing: 'border-box',
  },
  label: {
    fontSize: '20px',
    flexGrow: '1',
    textAlign: 'center',
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
    textAlign: 'center',
    position: 'absolute',
    top: '25px',
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
    uvIndex: 0,
    loading: true,
    level: levels.default,
  };
  componentDidMount () {
    this.getUvIndex ();
  }

  getUvIndex = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition (position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getUvIndex (
          lat,
          lon,
          moment ().unix (),
          moment ().hours ()
        ).then (uvIndex =>
          this.setState ({
            uvIndex: uvIndex,
            loading: false,
            level: getUvIndexLevel (uvIndex),
          })
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
            ? <CircularProgress color="white" />
            : <div style={styles.label}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={styles.subtitle}>{this.state.level.label}</div>
                  <div style={{textAlign: 'center'}}>
                    {this.state.level.subtitle}
                  </div>
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
