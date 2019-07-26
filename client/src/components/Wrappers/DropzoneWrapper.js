import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dropzone from 'react-dropzone';

const styles = theme => ({

});

class DropzoneWrapper extends Component {
    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this)
    }

  
    handleDrop(uploadedFiles) {
        if (uploadedFiles.length > 0) {
            this.props.handleUpdate(uploadedFiles[0]);
        }
    }

    render() {
        const { children } = this.props;
    
        return (    
            <section>
                <Dropzone onDrop={ this.handleDrop } accept="image/jpeg,image/jpg,image/tiff,image/gif" multiple={ false }>
                    {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                { children }
                            </div>
                        </section>
                    )}
                </Dropzone>
            </section>
        )
    }
}

export default withStyles(styles)(DropzoneWrapper);