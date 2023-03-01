import network from "network/apis";

export const getListJob = () => {
  return network.get(network.path.jobs.listJob);
};
export const deleteJob = (id) => {
  return network.delete(`${network.path.jobs.deleteJob}/${id}`);
};
