import { useFormikContext } from "formik";
import React, { useCallback } from "react";
import { cepService } from "../../../../../../services/utils/viaCep";
import { useMutation } from "react-query";

const Cep = () => {
  const { setFieldValue, getFieldProps, errors} = useFormikContext();

  const { mutate: mutateCep } = useMutation(["cep"], (cep) => cepService(cep), {
    onSuccess: (data) => {
      console.log(data);
      setFieldValue("uf", data.uf);
      setFieldValue("cidade", data.localidade);
    },
  });

  const handleChangeCepOnBlur = (e) => {
    console.log(e.target.value.length);

    if (e.target.value.length >= 8) {
      console.log(e);

      mutateCep(e.target.value);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="cep">CEP:</label>
      <input
        {...getFieldProps("cep")}
        type="text"
        onBlur={(e) => handleChangeCepOnBlur(e)}
      />
      {errors.cep && <p className="error-message">{errors.cep}</p>}
    </div>
  );
};

export default Cep;
