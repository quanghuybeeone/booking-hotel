import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const InputModal = ({
  titleModal,
  isOpen,
  onClose,
  url,
  inputFields,
  onUpdate,
  uploadUrl,
  targetId,
}) => {
  const [inputValues, setInputValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    axios
      .get(`${url}/find/${targetId}`)
      .then((response) => {
        setInputValues(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ server:", error);
        onClose();
      });
  }, [url, targetId, onClose]);

  const handleInputChange = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
    console.log(inputValues);
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (!validateInputs()) {
      setIsSubmitting(false);
      return;
    }

    const requestData = {};

    for (const field in inputValues) {
      requestData[field] = inputValues[field];
    }

    if (uploadUrl) {
      const uploadData = new FormData();
      const nameImages = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        uploadData.append(
          "multiple_images",
          selectedFiles[i],
          `${Date.now()}_${i}_${selectedFiles[i].name}`
        );
        nameImages.push(`${Date.now()}_${i}_${selectedFiles[i].name}`);
      }
      
      if (selectedFiles.length > 0) {
        requestData.photos = nameImages;
      }

      const request = await axios.put(`${url}/${targetId}`, requestData);
      const uploadRequest = await axios.post(uploadUrl, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (request && uploadRequest) {
        axios
          .all([request, uploadRequest])
          .then(
            axios.spread((requestData, uploadData) => {
              console.log("Dữ liệu đã được gửi thành công đến máy chủ");
              setIsSubmitting(false);
              setIsConfirmed(true);
              setInputValues({});
              setSelectedFiles([]);
              onUpdate();
            })
          )
          .catch((error) => {
            console.error("Lỗi khi gửi dữ liệu đến máy chủ:", error);
            setIsSubmitting(false);
            onClose();
          });
      }
    } else {
      const request = await axios.put(`${url}/${targetId}`, requestData);
      if (request) {
        console.log("Dữ liệu đã được gửi thành công đến máy chủ");
        setIsSubmitting(false);
        setIsConfirmed(true);
        setInputValues({});
        setSelectedFiles([]);
        onUpdate();
      }
    }
  };

  const validateInputs = () => {
    const errors = {};
    let hasError = false;

    inputFields.forEach((field) => {
      if (!inputValues[field]) {
        errors[field] = "Vui lòng điền thông tin trường này.";
        hasError = true;
      }
    });

    setFieldErrors(errors);
    return !hasError;
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (isConfirmed) {
      onClose();
    }
  }, [isConfirmed, onClose]);

  return (
    <>
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType="multipart/form-data">
            {inputFields.map((field, index) => (
              <Form.Group
                className="mb-2"
                controlId={`formInput-${index}`}
                key={field}
              >
                <Form.Label>{capitalizeFirstLetter(field)}:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${field} here`}
                  name={field}
                  value={inputValues[field] || ""}
                  onChange={handleInputChange}
                />
                {fieldErrors[field] && (
                  <div className="text-danger">{fieldErrors[field]}</div>
                )}
              </Form.Group>
            ))}
            {uploadUrl && (
              <Form.Group className="mb-2" controlId="formInputFile">
                <Form.Label>Photo:</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  multiple
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi dữ liệu"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isConfirmed} onHide={() => setIsConfirmed(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>Đã gửi dữ liệu thành công!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setIsConfirmed(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const ModalEditComponent = ({
  titleModal,
  inputFields,
  url,
  onUpdate,
  uploadUrl,
  targetId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <span className="mx-3">
        <div
          style={{ color: "orange", fontSize: "20px" }}
          className="btn p-0"
          onClick={handleOpenModal}
        >
          <i className="far fa-edit"></i>
        </div>
        <InputModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          url={url}
          inputFields={inputFields}
          titleModal={titleModal}
          onUpdate={onUpdate}
          uploadUrl={uploadUrl}
          targetId={targetId}
        />
      </span>
    </>
  );
};

export default ModalEditComponent;
