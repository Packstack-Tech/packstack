import * as React from 'react';
import { Modal, Alert } from "antd";
import { UploadOutlined } from '@ant-design/icons'

import { UploadModalSpecs } from "./types";

import withApi from "app/components/higher-order/with-api";
import { alertSuccess } from "app/components/Notifications";

import { ModalTitle } from "app/components/EditItem/styles";
import { UploadInputWrapper, UploadInstructions } from './styles';

const UploadModal: React.FC<UploadModalSpecs.Props> = ({ visible, upload, fetchItems, hideModal }) => {
    const fileInput = React.createRef<HTMLInputElement>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, hasError] = React.useState<boolean>(false);

    function handleSubmit() {
        if (fileInput.current && fileInput.current.files) {
            const file = fileInput.current.files[0];
            if (!file) {
                return;
            }
            const formData = new FormData();
            formData.append('file', file, file.name);

            setLoading(true);
            upload(formData)
                .then(() => {
                    alertSuccess({ message: 'Items successfully uploaded.' });
                    fetchItems();
                    setLoading(false);
                    hideModal();
                    hasError(false);
                })
                .catch(err => {
                    hasError(true);
                    setLoading(false);
                });
        }
    }

    const errorMsg = () => (
        <Alert type="error"
               description={`Make sure you're uploading a CSV file with the correct structure.`}
               message={`An error occurred.`}
               closable/>
    );

    return (
        <Modal
            title={<ModalTitle>Import Items</ModalTitle>}
            visible={visible}
            destroyOnClose={true}
            onCancel={hideModal}
            footer={false}
        >
            {error && errorMsg()}

            <UploadInstructions>
                <p>
                    Upload a CSV file of your inventory. The field names must match the specifications below.
                    Unrecognized fields will be ignored. <a href="/packstack-template.csv" download="Packstack Items">Download
                    the starter template.</a>
                </p>

                <UploadInputWrapper>
                    <input type="file" name="file" id="file"
                           ref={fileInput}
                           onChange={handleSubmit}
                           disabled={loading}/>
                    <label htmlFor="file">
                        <UploadOutlined /> Upload CSV
                    </label>
                </UploadInputWrapper>

                <div className="upload-specs">
                    <h3>CSV Fields</h3>
                    <ul>
                        <li>
                            <strong>Name<span>*</span></strong><br/>
                            Item type<br/>
                            <div className="example">
                                Ex: backpack
                            </div>
                        </li>
                        <li>
                            <strong>Product Name</strong><br/>
                            Product name or description<br/>
                            <div className="example">
                                Ex: Osprey Renn 65
                            </div>
                        </li>
                        <li>
                            <strong>Weight</strong><br/>
                            <div className="example">
                                Ex: 12.5
                            </div>
                        </li>
                        <li>
                            <strong>Weight Unit</strong><br/>
                            <div className="example">
                                Ex: oz, lbs, g, kg
                            </div>
                        </li>
                        <li>
                            <strong>Price</strong><br/>
                            Purchase price or estimated value<br/>
                            <div className="example">
                                Ex: 150
                            </div>
                        </li>
                        <li>
                            <strong>Product url</strong><br/>
                            <div className="example">
                                Ex: https://www.rei.com/product/829843/msr-ultralight-utility-cord
                            </div>
                        </li>
                    </ul>
                </div>
            </UploadInstructions>
        </Modal>
    )
};

const ModalWithApi = withApi<UploadModalSpecs.ApiProps>(api => ({
    upload: api.ItemService.uploadCSV
}))(UploadModal);

export default ModalWithApi;