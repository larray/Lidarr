import PropTypes from 'prop-types';
import React, { Component } from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import { icons, inputTypes, kinds } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Icon from 'Components/Icon';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import styles from './DeleteArtistModalContent.css';

class DeleteArtistModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      deleteFiles: false
    };
  }

  //
  // Listeners

  onDeleteFilesChange = ({ value }) => {
    this.setState({ deleteFiles: value });
  }

  onDeleteArtistConfirmed = () => {
    const deleteFiles = this.state.deleteFiles;

    this.setState({ deleteFiles: false });
    this.props.onDeletePress(deleteFiles);
  }

  //
  // Render

  render() {
    const {
      artistName,
      path,
      trackFileCount,
      sizeOnDisk,
      onModalClose
    } = this.props;

    const deleteFiles = this.state.deleteFiles;
    let deleteFilesLabel = `Delete ${trackFileCount} Track Files`;
    let deleteFilesHelpText = 'Delete the track files and artist folder';

    if (trackFileCount === 0) {
      deleteFilesLabel = 'Delete Artist Folder';
      deleteFilesHelpText = 'Delete the artist folder and it\'s contents';
    }

    return (
      <ModalContent
        onModalClose={onModalClose}
      >
        <ModalHeader>
          Delete - {artistName}
        </ModalHeader>

        <ModalBody>
          <div className={styles.pathContainer}>
            <Icon
              className={styles.pathIcon}
              name={icons.FOLDER}
            />

            {path}
          </div>

          <FormGroup>
            <FormLabel>{deleteFilesLabel}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="deleteFiles"
              value={deleteFiles}
              helpText={deleteFilesHelpText}
              kind={kinds.DANGER}
              onChange={this.onDeleteFilesChange}
            />
          </FormGroup>

          {
            deleteFiles &&
              <div className={styles.deleteFilesMessage}>
                <div>The artist folder <strong>{path}</strong> and all it's content will be deleted.</div>

                {
                  !!trackFileCount &&
                    <div>{trackFileCount} track files totaling {formatBytes(sizeOnDisk)}</div>
                }
              </div>
          }

        </ModalBody>

        <ModalFooter>
          <Button onPress={onModalClose}>
            Close
          </Button>

          <Button
            kind={kinds.DANGER}
            onPress={this.onDeleteArtistConfirmed}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

DeleteArtistModalContent.propTypes = {
  artistName: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  trackFileCount: PropTypes.number.isRequired,
  sizeOnDisk: PropTypes.number.isRequired,
  onDeletePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

DeleteArtistModalContent.defaultProps = {
  trackFileCount: 0
};

export default DeleteArtistModalContent;
