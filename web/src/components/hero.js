import PropTypes from 'prop-types';
import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import SanityMuxPlayer from 'sanity-mux-player';
import ReactPlayer from 'react-player';
import Dialog from '@material-ui/core/Dialog';
import { RemoveScroll } from 'react-remove-scroll';
import play from '../images/play.png';
import anim from '../images/anim.gif';

const useStyles = makeStyles({
  h2: {
    position: 'relative',
    paddingBottom: 20,
    marginBottom: 20,

    '&::after': {
      content: '""',
      display: 'block',
      width: 120,
      height: 5,
      backgroundColor: '#F25523',
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
  },
  btn: {
    marginTop: 30,
    borderRadius: 20,
    fontSize: '1.2rem',
    letterSpacing: '2px',
    padding: '2px 30px',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  btnPlay: {
    display: 'block',
    position: 'absolute',
    width: 120,
    maxWidth: '30%',
    zIndex: 100,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    opacity: 0.75,
    cursor: 'pointer',
    transition: 'opacity 0.2s linear',
    '&:hover': {
      opacity: 1,
    },
  },
  modalRoot: {
    '& .MuiBackdrop-root': {
      backgroundColor: '#000000cc',
    },
  },
  modalContainer: {
    position: 'fixed',
    top: 0,
    width: '100%',
  },
  modalPaper: {
    minWidth: 300,
    maxWidth: '100%',
    margin: 0,
    borderRadius: 0,
    backgroundColor: '#000',
    maxHeight: '100%',
  },
  preview: {
    width: '100%',
  },
});

function HeroSection({ heroSection }) {
  const classes = useStyles();
  const { title } = heroSection;
  const {
    title: featureTitle,
    description,
    // image,
    // video,
  } = heroSection.feature;
  const { url, label } = heroSection.cta;
  const [showVideo, setShowVideo] = useState(false);
  const rootEl = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (rootEl.current) {
      setDimensions({
        width: rootEl.current.offsetWidth,
        height: rootEl.current.offsetHeight,
      });
    }
  }, []);

  const handleClickOpen = () => {
    setShowVideo(true);
  };

  const handleClose = () => {
    setShowVideo(false);
  };

  return (
    <div ref={rootEl}>
      <Box my={8}>
        <Container fixed>
          {title && (
            <Box textAlign="center" mb={7}>
              <Typography variant="h1">{title}</Typography>
            </Box>
          )}
          <Grid container spacing={5} direction="row-reverse">
            <Grid item xs={12} lg={7}>
              <Box position="relative" minHeight={120}>
                <Button onClick={handleClickOpen}>
                  <img src={anim} alt="video" className={classes.preview} />
                  <img
                    src={play}
                    alt="play video icon"
                    className={classes.btnPlay}
                  />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Box display="flex" alignItems="center" height="100%">
                <Box>
                  <Typography variant="h2" gutterBottom className={classes.h2}>
                    {featureTitle}
                  </Typography>
                  <Typography variant="body1">{description}</Typography>
                  {heroSection.cta && (
                    <Button
                      component={Link}
                      href={url}
                      variant="contained"
                      color="secondary"
                      className={classes.btn}
                    >
                      {label}
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Dialog
        open={showVideo}
        onClose={handleClose}
        classes={{
          root: classes.modalRoot,
          container: classes.modalContainer,
          paper: classes.modalPaper,
        }}
      >
        <RemoveScroll>
          <ReactPlayer
            url="https://vimeo.com/409067592"
            playsinline
            playing={showVideo}
            controls
            width={
              dimensions.width > 700 ? dimensions.width * 0.8 : dimensions.width
            }
            height={
              (dimensions.width > 700
                ? dimensions.width * 0.8
                : dimensions.width) * 0.5625
            }
            config={{}}
          />
        </RemoveScroll>
      </Dialog>
    </div>
  );
}

HeroSection.propTypes = {
  heroSection: PropTypes.object,
};

HeroSection.defaultProps = {
  heroSection: null,
};

export default HeroSection;
