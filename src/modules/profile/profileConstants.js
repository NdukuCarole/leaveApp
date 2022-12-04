export default {
  jobs: "jobs",
  categories: "categories",
  stats: (param) =>
    `election/stats/${param.entity}?electionCode=${param.electionCode}`,
};
