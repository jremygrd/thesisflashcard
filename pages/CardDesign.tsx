import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import styles from '../styles/Home.module.css';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue, red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import CreateIcon from '@material-ui/icons/Create';
import { BorderAll } from '@material-ui/icons';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,

        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);


export default function RecipeReviewCard() {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [toggleBut, setToggleBut] = React.useState(false);

    const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        setFormats(newFormats);
    };

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Titre</h1>

            {/* <div className="wrapper"> */}
            <div className={styles.pagedelaCarte}>
                <div className={styles.sideButtonsGauche}>
                    <IconButton aria-label="grid" >
                        <NavigateBeforeIcon fontSize="small" />
                    </IconButton>
                </div>

                <div className={styles.Carte}>
                    <div className={styles.devant}>
                        <div style={{ textAlign: "center" }}>
                            <div className={styles.wrapperCard}>
                                <h2 style={{ margin: "central" }}>Question</h2>
                                <div className={styles.sideButtons}>
                                    <IconButton aria-label="white" >
                                        <CreateIcon fontSize="small" />
                                    </IconButton>
                                </div>

                            </div>
                            <img src="/pinguin.jpg" object-fit="contain" style={{ maxHeight: '200px', marginLeft: "auto", marginRight: "auto" }} />
                            <div>
                                <button className={styles.flipbutton} >Flip</button>
                            </div>

                            <div>
                                <ToggleButtonGroup className={styles.togglebuttons} value={formats} onChange={handleFormat} aria-label="text formatting">
                                    <ToggleButton style={{
                                        maxWidth: 350,
                                        minWidth: 350, margin: "20px",
                                        maxHeight: 150,
                                        minHeight: 50,
                                        borderRadius: "10px",
                                        color: "#6b7ddb",
                                        borderColor: "#6b7ddb",
                                        boxShadow: "1px 1px 1px 1px #6b7ddb",
                                    }} value="reponseA" aria-label="bold">
                                        Réponse A
                                </ToggleButton>
                                    <ToggleButton style={{
                                        maxWidth: 350,
                                        minWidth: 350, margin: "20px",
                                        maxHeight: 150,
                                        minHeight: 50,
                                        borderRadius: "10px",
                                        color: "#6b7ddb",
                                        borderColor: "#6b7ddb",
                                        boxShadow: "1px 1px 1px 1px #6b7ddb",
                                    }} value="reponseB" aria-label="bold">
                                        Réponse B
                                </ToggleButton>
                                    <ToggleButton style={{
                                        maxWidth: 350,
                                        minWidth: 350, margin: "20px",
                                        maxHeight: 150,
                                        minHeight: 50,
                                        borderRadius: "10px",
                                        color: "#6b7ddb",
                                        borderColor: "#6b7ddb",
                                        boxShadow: "1px 1px 1px 1px #6b7ddb",

                                    }} value="reponseC" aria-label="bold">
                                        Réponse C
                                </ToggleButton>
                                    <ToggleButton style={{
                                        maxWidth: 350,
                                        minWidth: 350, margin: "20px",
                                        maxHeight: 150,
                                        minHeight: 50,
                                        borderRadius: "10px",
                                        color: "#6b7ddb",
                                        borderColor: "#6b7ddb",
                                        boxShadow: "1px 1px 1px 1px #6b7ddb",
                                    }} value="reponseD" aria-label="bold">
                                        Réponse D
                                </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </div>

                    <div className={styles.derriere}>
                        Derrière
                    </div>
                </div>
                <div className={styles.sideButtonsDroit}>
                    <IconButton aria-label="grid" >
                        <NavigateNextIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>

            {/* </div> */}

        </div>
    );
}