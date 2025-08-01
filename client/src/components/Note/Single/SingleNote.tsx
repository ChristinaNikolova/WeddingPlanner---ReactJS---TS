import styles from "./SingleNote.module.css";

interface SingleNoteProps {
  id: string;
  description: string;
  createdAt: string;
  isEditIconHidden: boolean;
  onDeleteHandler: (noteId: string) => void;
  onShowFormHandler: (noteId: string) => void;
}

const SingleNote = ({
  id,
  description,
  createdAt,
  isEditIconHidden,
  onDeleteHandler,
  onShowFormHandler,
}: SingleNoteProps) => {
  return (
    <div className={styles["notes-all-info-wrapper"]}>
      <div className={styles["notes-all-info-left"]}>
        <p className={styles["notes-all-info"]}>{createdAt}</p>
        <div className={styles["notes-all-icon-wrapper"]}>
          {!isEditIconHidden && (
            <i
              onClick={() => onShowFormHandler(id)}
              className="fa-solid fa-pen"
            ></i>
          )}
          {!isEditIconHidden && (
            <i
              onClick={() => onDeleteHandler(id)}
              className="fa-solid fa-trash"
            ></i>
          )}
        </div>
      </div>
      <div className={styles["notes-all-info-right"]}>
        <p className={styles["notes-all-description"]}>{description}</p>
      </div>
    </div>
  );
};

export default SingleNote;
