import React, {Component} from 'react';
import moment from 'moment';
import {getUvIndex, getUvIndexLevel, levels} from './services/weather';
import {getAddress} from './services/location';
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
  address: {
    textAlign: 'center',
    fontSize: '12px',
    marginTop: '15px'
  }
};

class App extends Component {
  state = {
    uvIndex: 0,
    loading: true,
    address: '',
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
        Promise.all([getAddress(lat, lon), getUvIndex (
          lat,
          lon,
          moment ().unix (),
          moment ().hours ()
        )]).then (res =>
          this.setState ({
            uvIndex: res[1],
            loading: false,
            address: res[0],
            level: getUvIndexLevel (res[1]),
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
                    <div style={styles.address}>
                    {this.state.address}
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
