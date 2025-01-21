<script lang="js">
  import { get } from 'lodash-es';

  export let row, column, rowIndex, columnIndex;

  const formatDate = (data) => {
    if (data) {
      return data.toLocaleDateString(column.locale || 'en-US');
    } else {
      return '--';
    }
  };
</script>

{formatDate(get(row, column.field, false))}
