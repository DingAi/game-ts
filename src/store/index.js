import { defineStore, skipHydrate } from "pinia"
import axios from "axios"

const useAnalysis = defineStore("analysis", () => {
  const str = ref("")
  const tiemRangeList = ref([])
  const regressionData = ref([])
  const CKvalueList = ref([])
  const WKvalueList = ref([])
  const CRvalueList = ref([])
  const WRvalueList = ref([])
  const HAvalueList = ref([])

  const loadData = () => {
    axios.get("fastapi").then((response) => {
      str.value = response.data
    })
  }

  return {
    loadData,
  }
})

export { useAnalysis }
