import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import temp from '../Images/logo.jpg';
import axios, { all } from "axios";
import { useEffect } from 'react';
import '../css/CardDay.css';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: 500,
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {
    width: '200px',
    height: '250px',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    transform: 'translateX(-20px)',
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
}));

export const BlogCardDemo = React.memo(function BlogCard(props) {
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);
  const styles = useStyles();
  const url = props.Url;
  const im = props.Image;

  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();

  const handleClick = () => {
    setIsClicked(true);
    window.open(url, "_blank");
  }

  useEffect(() => {
    if (trip === null) {
      return;
    }
    navigate('/DayByDay', { state: { data: trip } });
  }, [trip])

  return (
    <div>

      <Card className={cx(styles.root, shadowStyles.root)}>

        <CardMedia
          component='img'
          id={props.id}
          className={styles.media}
          image={im}
        />


        <CardContent>

          <TextInfoContent
            classes={contentStyles}
            overline={props.Address}
            heading={props.header}
            body={props.body}

          />
          <Button onClick={handleClick} className={buttonStyles} >לפרטים</Button>

        </CardContent>
      </Card>
    </div>
  );
});

export default BlogCardDemo