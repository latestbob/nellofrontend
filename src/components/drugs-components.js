import * as React from "react";
import { Checkbox, Radio } from "pretty-checkbox-react";
import AppContext from "../context";
import MasterContext from "../layout/context";

export const CheckboxCategories = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const onChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      selectedCategories =
        selectedCategories === null ? [] : selectedCategories;
      setSelectedCategories([...selectedCategories, parseInt(value)]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((d) => d !== parseInt(value))
      );
    }
  };

  return (
    <>
      {categories && categories.length > 0 && (
        <ul className="with-check font-size-12">
          {categories.map((row, index) => {
            return (
              <li key={index}>
                <Checkbox
                  color="primary-o"
                  onChange={onChange}
                  defaultChecked={
                    selectedCategories && selectedCategories.includes(row.id)
                  }
                  value={row?.id}
                  icon={<i className="mdi mdi-check" />}
                >
                  {row?.name}
                </Checkbox>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

// export const CheckboxRatings = ({ selectedRatings, setSelectedRatings }) => {
//   const onChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       selectedRatings = selectedRatings === null ? [] : selectedRatings;
//       setSelectedRatings([...selectedRatings, parseInt(value)]);
//     } else {
//       setSelectedRatings(selectedRatings.filter((d) => d !== parseInt(value)));
//     }
//   };

//   return (
//     <ul className="with-check">
//       <li>
//         <Checkbox
//           color="primary-o"
//           onChange={onChange}
//           defaultChecked={selectedRatings && selectedRatings.includes(5)}
//           value={5}
//           icon={<i className="mdi mdi-check" />}
//         >
//           <span className="star-group">
//             <i class="la la-star rated"></i>
//             <i class="la la-star rated"></i>
//             <i class="la la-star rated"></i>
//             <i class="la la-star rated"></i>
//             <i class="la la-star rated"></i>
//           </span>
//         </Checkbox>
//       </li>
//       <li>
//         <Checkbox
//           color="primary-o"
//           onChange={onChange}
//           defaultChecked={selectedRatings && selectedRatings.includes(4)}
//           value={4}
//           icon={<i className="mdi mdi-check" />}
//         >
//           <span className="star-group">
//             <i class="la la-star rated"></i>
//             <i class="la la-star rated"></i>
//             <i class="la la-star rated"></i>
//             <i class="la la-star rated"></i>
//             <i class="la la-star "></i>
//           </span>
//         </Checkbox>
//       </li>
//       <li>
//         <Checkbox
//           color="primary-o"
//           onChange={onChange}
//           defaultChecked={selectedRatings && selectedRatings.includes(3)}
//           value={3}
//           icon={<i className="mdi mdi-check" />}
//         >
//           <span className="star-group">
//             <i class="la la-star rated"></i>
//             <i class="la la-star rated"></i>
//             <i class="la la-star rated"></i>
//             <i class="la la-star"></i>
//             <i class="la la-star"></i>
//           </span>
//         </Checkbox>
//       </li>
//       <li>
//         <Checkbox
//           color="primary-o"
//           onChange={onChange}
//           defaultChecked={selectedRatings && selectedRatings.includes(2)}
//           value={2}
//           icon={<i className="mdi mdi-check" />}
//         >
//           <span className="star-group">
//             <i class="la la-star rated"></i>
//             <i class="la la-star rated"></i>
//             <i class="la la-star"></i>
//             <i class="la la-star"></i>
//             <i class="la la-star"></i>
//           </span>
//         </Checkbox>
//       </li>
//       <li>
//         <Checkbox
//           color="primary-o"
//           onChange={onChange}
//           defaultChecked={selectedRatings && selectedRatings.includes(1)}
//           value={1}
//           icon={<i className="mdi mdi-check" />}
//         >
//           <span className="star-group">
//             <i class="la la-star rated"></i>
//             <i class="la la-star"></i>
//             <i class="la la-star"></i>
//             <i class="la la-star"></i>
//             <i class="la la-star"></i>
//           </span>
//         </Checkbox>
//       </li>
//     </ul>
//   );
// };

export const RadioPrescription = ({
  selectedPrescription,
  setSelectedPrescription,
}) => {
  return (
    <ul className="with-check">
      <li>
        <Radio
          color="primary-o"
          name="prescription"
          onChange={() => setSelectedPrescription("yes")}
          defaultChecked={selectedPrescription === "yes"}
          value="yes"
          bigger
        >
          Yes
        </Radio>
      </li>
      <li>
        <Radio
          color="primary-o"
          name="prescription"
          onChange={() => setSelectedPrescription("no")}
          defaultChecked={selectedPrescription === "no"}
          value="no"
          bigger
        >
          No
        </Radio>
      </li>
    </ul>
  );
};
