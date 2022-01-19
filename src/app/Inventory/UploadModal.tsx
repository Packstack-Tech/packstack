import { createRef } from "react"
import { Modal, Alert } from "antd"
import { UploadOutlined } from "@ant-design/icons"

import { useUploadCsv } from "queries/items"
import { alertSuccess } from "app/components/Notifications"

import { ModalTitle } from "app/components/EditItem/styles"
import { UploadInputWrapper, UploadInstructions } from "./styles"

interface Props {
  visible: boolean
  hideModal: () => void
}

export const UploadModal: React.FC<Props> = ({ visible, hideModal }) => {
  const upload = useUploadCsv()
  const fileInput = createRef<HTMLInputElement>()

  function handleSubmit() {
    if (fileInput.current && fileInput.current.files) {
      const file = fileInput.current.files[0]
      if (!file) {
        return
      }
      const formData = new FormData()
      formData.append("file", file, file.name)

      upload.mutate(
        { file: formData },
        {
          onSuccess: () => {
            alertSuccess({ message: "Items successfully uploaded." })
            hideModal()
          },
        }
      )
    }
  }

  return (
    <Modal
      title={<ModalTitle>Import Items</ModalTitle>}
      visible={visible}
      destroyOnClose={true}
      onCancel={hideModal}
      footer={false}
    >
      {upload.isError && (
        <Alert
          type="error"
          description="Make sure you're uploading a CSV file with the correct structure."
          message="An error occurred."
          closable
        />
      )}

      <UploadInstructions>
        <p>
          Upload a CSV file of your inventory. The field names must match the
          specifications below. Unrecognized fields will be ignored.{" "}
          <a href="/packstack-template.csv" download="Packstack Items">
            Download the starter template.
          </a>
        </p>

        <UploadInputWrapper>
          <input
            type="file"
            name="file"
            id="file"
            ref={fileInput}
            onChange={handleSubmit}
            disabled={upload.isLoading}
          />
          <label htmlFor="file">
            <UploadOutlined /> Upload CSV
          </label>
        </UploadInputWrapper>

        <div className="upload-specs">
          <h3>CSV Fields</h3>
          <ul>
            <li>
              <strong>
                Name<span>*</span>
              </strong>
              <br />
              Item type
              <br />
              <div className="example">Ex: backpack</div>
            </li>
            <li>
              <strong>Product Name</strong>
              <br />
              Product name or description
              <br />
              <div className="example">Ex: Renn 65</div>
            </li>
            <li>
              <strong>Manufacturer</strong>
              <br />
              Product manufacturer or vendor
              <br />
              <div className="example">Ex: Osprey</div>
            </li>
            <li>
              <strong>Weight</strong>
              <br />
              <div className="example">Ex: 12.5</div>
            </li>
            <li>
              <strong>Weight Unit</strong>
              <br />
              <div className="example">Ex: oz, lbs, g, kg</div>
            </li>
            <li>
              <strong>Price</strong>
              <br />
              Purchase price or estimated value
              <br />
              <div className="example">Ex: 150</div>
            </li>
            <li>
              <strong>Product url</strong>
              <br />
              <div className="example">
                Ex:
                https://www.rei.com/product/829843/msr-ultralight-utility-cord
              </div>
            </li>
          </ul>
        </div>
      </UploadInstructions>
    </Modal>
  );
}
