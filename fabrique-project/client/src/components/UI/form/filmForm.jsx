import { useForm, useController } from "react-hook-form";
import { slugCreation } from "../../../utils/functions";
import { zodResolver } from "@hookform/resolvers/zod";
import { filmSchema } from "../../schema/filmSchema";
import PuffLoader from "react-spinners/PuffLoader";
import classes from "./genericForm.module.scss";
import { useTranslation } from "react-i18next";
import TypeSelect from "../select/typeSelect";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const FilmForm = () => {
  const { t } = useTranslation();
  const uriLocation = window.location.href;

  useEffect(() => {
    if (uriLocation !== "http://localhost:3000/admin/films/update-film") {
      window.localStorage.removeItem("dataUpdateFilm");
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [uriLocation]);

  let dataUpdateFilm;

  if (window.localStorage.getItem("dataUpdateFilm")) {
    dataUpdateFilm = JSON.parse(window.localStorage.getItem("dataUpdateFilm"));
  }

  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: dataUpdateFilm ?? "",
    resolver: zodResolver(filmSchema),
  });

  const { errors } = formState;

  const { field } = useController({ name: "type", control });

  const [enteredFileIsValid, setEnteredFileisValid] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const handleSelectChange = (option) => {
    field.onChange(option.target.value);
  };

  const confirmHandler = (event) => {
    const enteredFileIsValid = file !== null && file !== "";
    setEnteredFileisValid(enteredFileIsValid);

    const formData = new FormData();

    formData.append("title", event.title);
    formData.append("director", event.director);
    formData.append("production", event.production);
    formData.append("screenwriter", event.screenwriter);
    formData.append("directorOfPhotography", event.directorOfPhotography);
    formData.append("synopsis", event.synopsis);
    formData.append("duration", parseInt(event.duration));
    formData.append("year", parseInt(event.year));
    formData.append("slug", slugCreation(event.title));
    formData.append("type", event.type);
    formData.append("file", file);

    if (dataUpdateFilm !== undefined) {
      formData.append("_id", dataUpdateFilm.payload._id);
    }

    if (formData !== {}) {
      if (uriLocation === "http://localhost:3000/admin/films/add-new-film") {
        setIsLoading(true);
        axios
          .post("http://localhost:5000/add-film", formData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(
              "there is an error for addition of a new Film: ",
              err.name
            );
            setError(err);
          })
          .finally(() => {
            window.location.replace("/admin/films");
            setIsLoading(false);
          });
      } else if (
        uriLocation === "http://localhost:3000/admin/films/update-film"
      ) {
        setIsLoading(true);
        axios
          .post("http://localhost:5000/update-film", formData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error("there is an error for updating a film: ", err.name);
            setError(err);
          })
          .finally(() => {
            window.location.replace("/admin/films");
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <section className={classes.form__wrapper}>
      <form
        onSubmit={handleSubmit(confirmHandler)}
        className={classes.form__container}
      >
        <div className={classes.form__container__item}>
          {!isUpdate
            ? !isUpdate && <h4>{t("labels.addDbFilm")}</h4>
            : isUpdate && <h4>{t("labels.modifyDbFilm")}</h4>}
          <label htmlFor="Title">{t("title")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.title ?? ""}
            {...register("title")}
            type="text"
          />
          {errors.title?.message && <small>{errors.title?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Director">{t("director")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.director ?? ""}
            {...register("director")}
            type="text"
          />
          {errors.director?.message && (
            <small>{errors.director?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Production">{t("production")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.production ?? ""}
            {...register("production")}
            type="text"
          />
          {errors.production?.message && (
            <small>{errors.production?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Screenwriter">{t("screenwriter")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.screenwriter ?? ""}
            {...register("screenwriter")}
            type="text"
          />
          {errors.screenwriter?.message && (
            <small>{errors.screenwriter?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="DirectorOfPhotography">
            {t("directorOfPhotography")}
          </label>
          <input
            defaultValue={
              formState.defaultValues?.payload?.directorOfPhotography ?? ""
            }
            {...register("directorOfPhotography")}
            type="text"
          />
          {errors.directorOfPhotography?.message && (
            <small>{errors.directorOfPhotography?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Synopsis">{t("synopsis")}</label>
          <textarea
            defaultValue={formState.defaultValues?.payload?.synopsis ?? ""}
            {...register("synopsis")}
            type="text"
          ></textarea>
          {errors.synopsis?.message && (
            <small>{errors.synopsis?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Duration">{t("duration")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.duration ?? ""}
            {...register("duration")}
            type="number"
          />
          {errors.duration?.message && (
            <small>{errors.duration?.message}</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Year">{t("year")}</label>
          <input
            defaultValue={formState.defaultValues?.payload?.year ?? ""}
            {...register("year")}
            type="number"
          />
          {errors.year?.message && <small>{errors.year?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Type">{t("typology")}</label>
          <TypeSelect onChange={handleSelectChange} value={field.value} />
          {errors.type?.message && <small>{errors.type?.message}</small>}
        </div>
        <div className={classes.form__container__item}>
          <label htmlFor="Image">{t("cover")}</label>
          <input
            onChange={(event) => {
              const file = event.target.files[0];
              setFile(file);
            }}
            type="file"
            name="Image"
            required
          />
          {!enteredFileIsValid && (
            <small>Campo obbligatorio, inserire la cover del film</small>
          )}
        </div>
        <div className={classes.form__container__item}>
          {!isUpdate
            ? !isUpdate && (
                <>
                  <button className={classes.secondary__button} type="submit">
                    {t("insertAction")}
                  </button>
                  <div className={classes.generic__margin__top}>
                    {error && <small>{t("errors.dbCrud")}</small>}
                  </div>
                </>
              )
            : isUpdate && (
                <>
                  <button className={classes.secondary__button} type="submit">
                    {t("modifyAction")}
                  </button>
                  <div className={classes.generic__margin__top}>
                    {error && <small>{t("errors.dbCrud")}</small>}
                  </div>
                </>
              )}
        </div>
        {isLoading && (
          <PuffLoader
            style={{
              display: "inherit",
              position: "relative",
              width: "100px",
              height: "100px",
              margin: "auto",
            }}
            color={"#cc0000"}
            size={100}
          />
        )}
      </form>
    </section>
  );
};

export default FilmForm;
