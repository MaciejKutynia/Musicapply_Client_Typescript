import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { toggleFormView, toggleIsEdit } from "redux-components/actions/nav";
import {
  saveNewTrack,
  editTrack,
  setLoading,
  hideLoader,
} from "redux-components/actions/music";

//import types
import { FormProps } from "types/components/Form";
import StoreInitialState from "types/redux";
import { readFile } from "utils/readFile";

//import assets
import defaultIMG from "assets/images/default.png";

const regex = /[./[]/g;

const Form: React.FC<FormProps> = (props) => {
  const {
    formIsVisible,
    isEdit,
    editedTrack,
    toggleFormView,
    toggleIsEdit,
    saveNewTrack,
    editTrack,
    setLoading,
    hideLoader,
  } = props;

  const [audioName, setAudioName] = useState<string>(
    "Załącz plik lub upuść tutaj",
  );
  const [imageName, setImageName] = useState<string>(
    "Załącz plik lub upuść tutaj",
  );
  const [audioFiles, setAudioFiles] = useState<any>(null);
  const [imageFiles, setImageFiles] = useState<any>(null);

  const [checkbox, setCheckbox] = useState(false);
  const [cover, setCover] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    if (isEdit) {
      setArtist(editedTrack?.artist || "");
      setCover(editedTrack?.cover || "");
      setTitle(editedTrack?.name || "");
      setCheckbox(true);
    } else {
      setArtist("");
      setCover("");
      setTitle("");
      setCheckbox(false);
    }
  }, [isEdit, editedTrack]);

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isEdit) {
      if (audioFiles) {
        let src = await readFile(audioFiles),
          IMGsrc;
        if (checkbox) {
          cover ? (IMGsrc = cover) : (IMGsrc = defaultIMG);
        } else {
          imageFiles
            ? (IMGsrc = await readFile(imageFiles))
            : (IMGsrc = defaultIMG);
        }

        if (!artist || !title) {
          let name = audioFiles.name.split(regex)[0];
          name = name.split("-");
          setArtist(name[0]);
          setTitle(name[1]);
        }
        const file = {
          src,
          artist,
          name: title,
          cover: IMGsrc,
          _id: "default",
        };
        setLoading();
        saveNewTrack(file);
        toggleIsEdit(false);
        setCover("");
        setTitle("");
        setArtist("");
        setAudioFiles(null);
        setImageFiles(null);
        setImageName("Załącz plik lub upuść tutaj");
        setAudioName("Załącz plik lub upuść tutaj");
        hideLoader();
        return;
      }
    }
    let IMGsrc = undefined;
    if (checkbox) {
      cover ? (IMGsrc = cover) : (IMGsrc = defaultIMG);
    } else {
      imageFiles
        ? (IMGsrc = await readFile(imageFiles))
        : (IMGsrc = defaultIMG);
    }
    const file = {
      cover: IMGsrc,
      name: title,
      artist,
      _id: editedTrack?._id || "",
      src: "test",
    };
    setLoading();
    editTrack(file);
    toggleIsEdit(false);
    setCover("");
    setTitle("");
    setArtist("");
    setAudioFiles(null);
    setImageFiles(null);
    setImageName("Załącz plik lub upuść tutaj");
    setAudioName("Załącz plik lub upuść tutaj");
    hideLoader();
  };

  const audioFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setAudioName(e.currentTarget.files[0].name);
      setAudioFiles(e.currentTarget.files[0]);
      return;
    }
    setAudioName("Załącz plik lub upuść tutaj");
  };

  const imageFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setImageName(e.currentTarget.files[0].name);
      setImageFiles(e.currentTarget.files[0]);
      return;
    }
    setImageName("Załącz plik lub upuść tutaj");
  };

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox(!checkbox);
  };

  return (
    <form
      className={`upload-form${formIsVisible ? " visible" : ""}`}
      encType="multipart/form-data">
      <div className="close" onClick={() => toggleFormView(false)}>
        &times;
      </div>
      <div
        className="input-wrapper"
        style={{ display: isEdit ? "none" : "flex" }}>
        <small>Plik MP3*</small>
        <label className="upload-file">
          <p>{audioName}</p>
          <input type="file" accept=".mp3" onChange={audioFileHandler} />
        </label>
      </div>
      <div className="input-wrapper text-input">
        <small>Artysta</small>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setArtist(e.currentTarget.value)
          }
          value={artist}
        />
      </div>
      <div className="input-wrapper text-input">
        <small>Tytuł</small>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
          value={title}
        />
      </div>
      <div className={`input-wrapper${checkbox ? " text-input" : ""}`}>
        <div>
          <small>Okładka</small>
          <small>Zaznacz aby podać link do obrazka</small>
          <input
            type="checkbox"
            checked={checkbox}
            onChange={checkboxHandler}
          />
        </div>
        <input
          type="text"
          style={{ display: checkbox ? "inline-block" : "none" }}
          value={cover}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCover(e.currentTarget.value)
          }
        />
        <label
          className="upload-file"
          style={{ display: checkbox ? "none" : "flex" }}>
          <p>{imageName}</p>
          <input type="file" accept="image/*" onChange={imageFileHandler} />
        </label>
      </div>
      <button className="btn submit" type="submit" onClick={submitHandler}>
        Prześlij
      </button>
    </form>
  );
};

const mapStateToProps = ({ nav, music }: StoreInitialState) => {
  const { formIsVisible, isEdit } = nav;
  const { editedTrack } = music;
  return { formIsVisible, isEdit, editedTrack };
};

const mapStateToDispatch = {
  toggleFormView,
  toggleIsEdit,
  saveNewTrack,
  editTrack,
  setLoading,
  hideLoader,
};

export default connect(mapStateToProps, mapStateToDispatch)(Form);
