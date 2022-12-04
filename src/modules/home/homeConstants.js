export default {
  jobs: "vacancy",
  categories: "category/jobCategories",
  submit: "submit",
  questions: "answers/save",
  SINGLEJOB: (id) => `vacancy/${id}`,
  APPLICATIONS: (id) => `submit/${id}`,
  SINGLEAPPLICATION: "submit/single-appl",
};
