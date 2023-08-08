// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';

// const InputModal = ({ titleModal, isOpen, onClose, url, inputFields, onUpdate, uploadUrl }) => {
//   const [inputValues, setInputValues] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [fieldErrors, setFieldErrors] = useState({});

//   const handleInputChange = (event) => {
//     setInputValues({
//       ...inputValues,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleFileChange = (event) => {
//     setSelectedFiles(event.target.files);
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);

//     if (!validateInputs()) {
//       setIsSubmitting(false);
//       return;
//     }

//     const requestData = {};
//     const uploadData = new FormData();
//     const nameImages = [];

//     for (const field in inputValues) {
//       requestData[field] = inputValues[field];
//     }

//     for (let i = 0; i < selectedFiles.length; i++) {
//       uploadData.append('multiple_images', selectedFiles[i], `${Date.now()}_${i}_${selectedFiles[i].name}`);
//       nameImages.push(`${Date.now()}_${i}_${selectedFiles[i].name}`);
//     }

//     if (selectedFiles.length > 0) {
//       requestData.photos = nameImages;
//     }

//     const request = await axios.post(url, requestData);
//     const uploadRequest = await axios.post(uploadUrl, uploadData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     if (request && uploadRequest) {
//       axios
//         .all([request, uploadRequest])
//         .then(
//           axios.spread((requestData, uploadData) => {
//             console.log('Dữ liệu đã được gửi thành công đến máy chủ');
//             setIsSubmitting(false);
//             setIsConfirmed(true);
//             setInputValues({});
//             setSelectedFiles([]);
//             onUpdate();
//           })
//         )
//         .catch((error) => {
//           console.error('Lỗi khi gửi dữ liệu đến máy chủ:', error);
//           setIsSubmitting(false);
//           onClose();
//         });
//     }
//   };

//   const validateInputs = () => {
//     const errors = {};
//     let hasError = false;

//     inputFields.forEach((field) => {
//       if (!inputValues[field]) {
//         errors[field] = 'Vui lòng điền thông tin trường này.';
//         hasError = true;
//       }
//     });

//     setFieldErrors(errors);
//     return !hasError;
//   };

//   const capitalizeFirstLetter = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };

//   useEffect(() => {
//     if (isConfirmed) {
//       onClose();
//     }
//   }, [isConfirmed, onClose]);

//   return (
//     <>
//       <Modal show={isOpen} onHide={onClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{titleModal}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form encType='multipart/form-data'>
//             {inputFields.map((field, index) => (
//               <Form.Group className="mb-2" controlId={`formInput-${index}`} key={field}>
//                 <Form.Label>{capitalizeFirstLetter(field)}:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder={`Enter ${field} here`}
//                   name={field}
//                   value={inputValues[field] || ''}
//                   onChange={handleInputChange}
//                 />
//                 {fieldErrors[field] && <div className="text-danger">{fieldErrors[field]}</div>}
//               </Form.Group>
//             ))}
//             <Form.Group className="mb-2" controlId="formInputFile">
//               <Form.Label>Photo:</Form.Label>
//               <Form.Control type="file" onChange={handleFileChange} multiple />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose}>
//             Hủy
//           </Button>
//           <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
//             {isSubmitting ? 'Đang gửi...' : 'Gửi dữ liệu'}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <Modal show={isConfirmed} onHide={() => setIsConfirmed(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Xác nhận</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Đã gửi dữ liệu thành công!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={() => setIsConfirmed(false)}>
//             Đóng
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// const ModalAddComponent = ({ titleModal, inputFields, url, onUpdate, uploadUrl }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <span className="mx-3">
//         <div
//           style={{ border: "1px solid" }}
//           className="btn btn-primary m-1 mx-1"
//           onClick={handleOpenModal}
//         >
//           <i className="fas fa-plus"></i>
//         </div>
//         <InputModal
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           url={url}
//           inputFields={inputFields}
//           titleModal={titleModal}
//           onUpdate={onUpdate}
//           uploadUrl={uploadUrl}
//         />
//       </span>
//     </>
//   );
// };

// export default ModalAddComponent;

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
}) => {
  const [inputValues, setInputValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (event) => {
    if (event.target.name == "roomNumbers") {
      const roomNumbers = event.target.value.split(" ").map((number) => ({ number: parseInt(number) }))
      setInputValues({
        ...inputValues,
        [event.target.name]: roomNumbers,
      });
    } else {
      setInputValues({
        ...inputValues,
        [event.target.name]: event.target.value,
      });
    }

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
    // console.log(requestData);
    requestData.featured = true
    

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

      const request = await axios.post(url, requestData);
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
      const request = await axios.post(url, requestData);
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
            {inputFields.map((field, index) => {
              if(field == "roomNumbers"){
                return (
                  <Form.Group
                    className="mb-2"
                    controlId={`formInput-${index}`}
                    key={field}
                  >
                    <Form.Label>{capitalizeFirstLetter(field)}: (101 102 103)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`Nhập cách nhau bởi dấu cách (vd:101 102 103)`}
                      name={field}
                      // value={inputValues[field] || ""}
                      onChange={handleInputChange}
                    />
                    {fieldErrors[field] && (
                      <div className="text-danger">{fieldErrors[field]}</div>
                    )}
                  </Form.Group>
                )
              }else{
                return (
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
                );
              }
              
            })}
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

const ModalAddComponent = ({
  titleModal,
  inputFields,
  url,
  onUpdate,
  uploadUrl,
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
          style={{ border: "1px solid" }}
          className="btn btn-primary m-1 mx-1"
          onClick={handleOpenModal}
        >
          <i className="fas fa-plus"></i>
        </div>
        <InputModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          url={url}
          inputFields={inputFields}
          titleModal={titleModal}
          onUpdate={onUpdate}
          uploadUrl={uploadUrl}
        />
      </span>
    </>
  );
};

export default ModalAddComponent;
