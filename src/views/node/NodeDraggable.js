import React from 'react';
import Draggable from 'react-draggable';
import { Router } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import MainCard from '../../ui-component/cards/MainCard';
import Box from '@material-ui/core/Box';

import {
    Button,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    Typography,
    Table,
    TableCell,
    TableRow,
    TableBody
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { BrowserRouter, Link } from 'react-router-dom';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';

// style constant

export class DraggableDialog extends React.Component {
    state = {
        node_id: '',
        id: '',
        itemID: '',
        activeDrags: 0,
        deltaPosition: {
            x: 0,
            y: 0
        },
        controlledPosition: {
            x: -400,
            y: 200
        },
        showChild: false,
        data: null,
        dataLoaded: false,
        oneShotLogged: false,
        initialized: false,
        defaultPosition: { x: 0, y: 0 }
    };

    constructor(props) {
        super(props);
        this.state.itemID = (this.props.itemID && props.itemID) || '';
        this.state.id = this.state.itemID.replace('popup_', '');
        this.state.node_id = this.props.itemID.replace('popup_', 'node_');
        this.state.label = this.props.label;
        this.state.showChild = this.props.showChild;
        if (this.state.data == null) {
            this.state.data = this.props.data;
            this.state.dataLoaded = true;
        }
    }

    closeChild = (e) => {
        this.state.showChild = false;
        this.props.updateShowChild(e, this.state.node_id);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ showChild: nextProps.showChild });
    }

    handleDrag = (e, ui) => {
        const { x, y } = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY
            }
        });
    };

    onStart = () => {
        this.setState({ activeDrags: ++this.state.activeDrags });
    };

    onStop = (e) => {
        this.setState({ activeDrags: --this.state.activeDrags });
    };
    onDrop = (e) => {
        this.setState({ activeDrags: --this.state.activeDrags });
        if (e.target.classList.contains('drop-target')) {
            e.target.classList.remove('hovered');
        }
    };
    onDropAreaMouseEnter = (e) => {
        if (this.state.activeDrags) {
            e.target.classList.add('hovered');
        }
    };
    onDropAreaMouseLeave = (e) => {
        e.target.classList.remove('hovered');
    };

    // For controlled component
    adjustXPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { x, y } = this.state.controlledPosition;
        this.setState({ controlledPosition: { x: x - 10, y } });
    };

    adjustYPos = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { controlledPosition } = this.state;
        const { x, y } = controlledPosition;
        this.setState({ controlledPosition: { x, y: y - 10 } });
    };

    onControlledDrag = (e, position) => {
        const { x, y } = position;
        this.setState({ controlledPosition: { x, y } });
    };

    onControlledDragStop = (e, position) => {
        this.onControlledDrag(e, position);
        this.onStop();
    };

    renderInfo() {
        let return_arr = [];
        Object.keys(this.state.data.properties).map((information) => {
            switch (information) {
                case ('id', 'label'):
                    break;
                case ('comment', 'type'):
                    // return_arr.push(
                    //     <Grid>{information + ": "} {this.state.data.properties[information]}
                    //     </Grid>)
                    break;
                case '':
                    break;
                default:
                    break;
            }
        });
        return return_arr;
    }

    linkClicked(node_id = null) {
        window.location.replace(node_id);
    }

    render() {
        const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
        const { deltaPosition, controlledPosition } = this.state;
        if (!this.state.oneShotLogged) {
            this.state.defaultPosition = { x: this.props.x, y: this.props.y };
            this.state.oneShotLogged = true;
        }

        if (this.state.showChild && !this.state.data) {
            // this.state.data = this.state.id;
        }

        return (
            <React.Fragment>
                {this.state.showChild && (
                    <Draggable
                        id={this.state.itemID}
                        itemID={this.state.itemID}
                        key={this.state.itemID}
                        onClose={this.closeChild}
                        padding={'10px'}
                        //defaultPosition = {{x:this.state.defaultPosition.x,y:this.state.defaultPosition.y}}
                        {...dragHandlers}
                    >
                        <Grid className="box no-cursor -border-all">
                            <Grid className="cursor">
                                {/*<Button className={"button"}>Click to Drag</Button>*/}
                                <Table>
                                    <TableBody>
                                        <TableRow border={0}>
                                            <TableCell align={'right'}>
                                                <DragHandleIcon
                                                    horizontalAlign="center"
                                                    justifyContent="center"
                                                    edge={'end'}
                                                ></DragHandleIcon>
                                            </TableCell>

                                            <TableCell align={'right'}>
                                                <CloseIcon
                                                    align={'right'}
                                                    alignItems={'right'}
                                                    onClick={this.closeChild}
                                                    edge={'end'}
                                                ></CloseIcon>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                            <Grid>
                                <Grid>
                                    <h2>{this.state.data.properties.label}</h2>
                                </Grid>
                                <Grid>
                                    <b>Labels:</b>{' '}
                                    {this.state.data.labels.map((label) => (
                                        <span key={'span_' + label + '_' + this.state.itemID}>{label + ', '}</span>
                                    ))}
                                </Grid>
                                {this.state.data.properties.type && this.state.data.properties.type !== '' && (
                                    <Grid>
                                        <b>{'Type: '}</b>
                                        {this.state.data.properties.type}
                                    </Grid>
                                )}
                                {this.state.data.properties.date && this.state.data.properties.date !== null && (
                                    <Grid>
                                        <b>{'Date: '}</b>
                                        {this.state.data.properties.date.day.low +
                                            '/' +
                                            this.state.data.properties.date.month.low +
                                            '/' +
                                            this.state.data.properties.date.year.low +
                                            ' (d/m/yyyy)'}
                                    </Grid>
                                )}
                                {this.state.data.properties.comment && this.state.data.properties.comment !== '' && (
                                    <Grid>
                                        <b>{'Comment: '}</b>
                                        {
                                            this.state.data.properties.comment.split("\\n").map(textLine => (
                                                <span>
                                                    <br/>
                                                    {textLine.replace(/[\u0000-\u001F\u007F-\u009F\ufff0-\uffff]/g, "")}
                                                    <br/>
                                                </span>
                                            ))
                                        }
                                    </Grid>
                                )}
                                {this.state.data.properties['accessURL'] &&
                                    this.state.data.properties['accessURL'].map((link, index) => (
                                        <Grid item key={index}>
                                            <Typography variant="subtitle2" color="inherit">
                                                {
                                                    !link.includes("theonlinecitizen.com") && (
                                                        <a href={link} style={{ textDecoration: 'none' }}>
                                                        </a>
                                                    )
                                                }
                                            </Typography>
                                        </Grid>
                                    ))}
                            </Grid>
                            {/* <Grid>
                                <Button
                                    size="small"
                                    disableElevation
                                    onClick={() => {
                                        this.linkClicked(this.state.id);
                                    }}
                                >
                                    <Typography variant="subtitle2">{this.state.label}</Typography>
                                    <ChevronRightOutlinedIcon />
                                </Button>
                            </Grid> */}
                        </Grid>
                    </Draggable>
                )}
            </React.Fragment>
        );
    }
}
