import { InstanceBase, InstanceStatus, Regex } from '@companion-module/base'

const logoPng = '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'
const logoTestPng = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAaQElEQVR4nO2beXBc1Z3vP+fe3rsltfZdtrVakm15xRvG2AaMF+yHMfGYLcOEkIQAk+HNpCbLJBUSz7wUyTABJgwh4BCSsBqDtxhveLflRfIqWbK172p1q7vVe/e99/0hKXEIeJOdvLzyt+pUdZ0+9yzf8zu/5Z7fhZu4iZu4iZu4ib9ViEv8p31GXexz6v/WIADdZ9T9GT7d6PMQZpCcPv7/IEgHJAH6ofK5uJwEaUNtHID3cp39DUEAISANSGBwndJnNfzMyiEMkxNgUIIM13eOnw8hLrVv1wUaYAJ8QIRLCMqVHLHIULli6bHb7ZIQAkVRtFAohE6nw2g0CgCfz6cpiqLpdDphMBjQ6/UCQFVVBgYGVFVV0TRNk2VZ2Gw2SQhBOBzWgsGgZjQahcViEQChUEhTFAWTySRkWUZRFLxer3qlcxzCsOr43M2/EoIElz6Kf9qhTie2bt2ampCQIGw2m5SWlib7fD6tu7tbkSSJp556yjVz5kzjd7/73YT+/n7V6XSqkiTR29urrFq1qq+np0dZvny55Zvf/GZ8cnKyiEajQqfTSWvWrOkHtG9/+9v2WCym5eXl6Y1GI11dXUooFFJra2tjK1eu7FPVq+Loqtb2aagMiqIbaARagZarKA0PPPCAQ9M0bf369QGgaag0vvDCCx5N07TnnnvOM1TXPFwyMzPb3W63sn379uBQXcuKFSscq1atclzUR3NVVVUkFAqp8+fP7wEahtteRWkdWleASxieK7ViVwWz2SwikYhkNpsFgCzLyLIs6XQ6IpGIqigKAIFAQGNwI4Z3UqSkpEgJCQlSUlKS9Mgjj9iOHj0a+eCDD3wAkiTJQghNCIEkSaiqis1mE7IsS7Isi0gkct3Xciklfc2IxWIoisKwuGuahqIoKIqCpmlo2uCGPfroo9Y9e/Zk7d+/P/OnP/1pktFoFE1NTbEDBw6EJ0+ebHjjjTeSt2zZkrpr166MhQsXWlRVVYb7Gu5DVdU/Get644ZI0OUwbKUOHz4cfuWVVwYkSRIOh0ONxWKEw2Ht7rvvdtx///3m5cuXWxYsWGAaPXq0zmQyicOHD4c9Ho8mSTdkXz8TN5QgVVWJRCJaLBb7kzOuKAqRSESrqqqK7Ny508cfj5hsNBolo9HI2rVrB9auXeuNi4vTe73enNTUVNlgMAiGjmQ0GtWi0ah2oyRnGDeUIKvVKgwGg0hJSZEvrrfb7ZLBYBArVqywRKNRDRCapvHqq6/60tLS5E2bNqVu3Lgx2NXVpYwaNUoeGBjQ3nvvPb/D4VAkSRKappGeni7Hx8f/Qc/dKNwQgoZ2VRw6dCjy4x//2HPmzJnYxfXr1q0L9PX1KVarVYwbN+4PPojBYBAtLS3K888/7y0qKtKVlZXpfT6f+tBDD/Vt2LAhCAhVVRFC8JOf/MSbmpoqnT59OjpcfyNwKfaHrYsHcDFI5tXGYRdbqYsVx7ALAX/ap+5T/w9780IIIQ0r5k+1kS6zjs+DYNBJzADMn9fHlUrQNYmxJElCp9PpVFXlYj00bJY/3T4ajWqapqHX62X4ozJXVVUbdg2GodfrZSEEsVhsJHrosuu60mC1l8G4RS/JMrIkEYvFQAgkIQ35JAqKoiLLMhoamqoiNA1taJGapiFJEkKSQNMQQuLikGuYDA2IqYO/dEJDoIEGiqahaqCpGsMPSpqKJA0+q6pDoirJQ+OpMDS+AKTB0Ofi9UUYjOgTuUSweqUEeRmMfi/pdV4K4lofvDGQASMQB1gYAUF/bCgEmqZ5K26Zoc2dNZO33l+PlJBGSV4W0yaN51R1NXt272Hm7fMJxzRaj32CPugjkjIKn9/PgNtFdt4Yxo8fh9frJX/MaFKSkwhHY2iqRmZ6CkaDjC8Q5pVWBaJ+Ho5rItngwxAOcqRdZuv5MP7GE8gZBagmM/ltVcwsMBNv1VPVo3JeSSV/4nSIBulpbSLk89BjTydHJyhMtLBn7z5UJaoxqFpsV8LFleogbUgC4ufccRcPrriX9Tv2Y80Yw+3L7+Ph++5h7Ssvsn3bLhaufJjTdU3kte4l7NLYHdXQ0Jg97y5Wr36AsSUlVJ06y4SKSeTk5uLzOFGiEWZNKQegJgw/+yTMt7Ma+NfRZ6C/Dse+M+x/vRmRkIlhynKUrlrUoJ8Mg8ZXxpuYMi6L3x138cMjISxpo8nJysJqq8LV2UJPTimpVo05OSkcOnqUkC86vNnDp+OSuHIlLQRomlZdWcnq/7WciqLRbN25h9px5ezam4zeFMcDX34CR6+ThkNbmR1201g6HdHsIT8rnWXL76X6WCV2eyJ2xUlJdB/9zWmc6TIx4HSiI8bE8WN5Y3czxlNt3Gs4BB01vPVuNd/6JEpHzIrF2IpSsQjF0URS0ElPWjGVjedJH51JQNKTFGmncsNv6Jq2AJO3E7fLiZYdpcCewIDPRzjgHyRneE1XgCv22YdMrDh6cJ+oq6sTjz7ykLBbDaLmWKVo7+oR2YVlYvadS0R9U5PoOXdcDGQUiIIF9wqbUS+KxpaJ8rJScdttt4m0jEzhcg+I/hMfi0nsElmuA6K1u1/4/X5hMOhE2B8RCa42kVW7XWxe+7F4coNTdIdkkZqaJtJm3ysS1aDQFEVIBpMYO3+52K+MEe/ubRJNjqCIxGUIJWWMaAn0C6eK6NObRYJRE7cV5Yujp04KTVWFJEkCTbtiq3y1BBENB/nHJ5/grXff4+knn6Cu6iBnz56hs6eH6iOHqa49gy3mw5ydQ3tLE7Y4G3qDnuQkO6kpqVTu28WR2laeeaOePW9uInLoLZov1BBvTwJkJuck4OgPs/FAFz/a4yW7ZCppmo+uhnP4ag9g0RswqTGi0Rh9rReQsgt46ZTC5vMqLbF4wsWTCAV9tEWD+PLzuTM5jt9v3sT+T3YiSX9myS6Lq73VGHpIoKHx2Fe/zoDbw77jp5kx6zbq+xw0n6qk2NfOgCWFeY88wbnqYySaTRSVFPP+u78jFAxhsVpw+SLQ08Kk/BSWfeNHPP7Yo1iMelzBCI/89hiHX/0PclsOk/CNNXQQonRggOoXfoyvdC64OjDE/Nhzi+m/UI2sROgx5yCyikgyhZiabid/TB6a0UTXieN8tGkDAi4X8Y9ISf9ZV5KQeOu3b/JfL75E7bk6Pt61jYhORuf1UTWgY/rUKUyaPJX3177CvDlzSE/P5Jn//a/k5OWhCsG52nPs2F/JsqWL+fKDK7CYDCiKQpLFwHMrJrGy60u0bdST3tfGrSX5aFV7COdPxl52C6GzB/HUHKJwzlIc/f04WhowJegJWQxo+eV8ccFY+vu9/Pr1Vzl68gSaql6zi3FNBA2/0/EPeDl69ChJaanU1teTU1yOQ5VJtvpY/fdfZv/+/Rh1epbfu5Lx48dz9MghZFkiPS2DqCozc/o05s6cgqwbfN096GRCaZKZF1fP4Av6RHaFwhS19uEpWolt7iiM56sQ6bn0XKjF3dVO6R33cGzdm4QT8oh39+E82MiZcekc2byew8ePjvgCYETBqslkIiUlhaSkFFbfu5xtpxvZvH498xYto9cbZsf6t/nS6vvIzs6iqbmJYDhCOAa9rgHS5X6m5Kcg6/SEQ2F8fh+KohAfZ8NktjC/yM6bE5p4vCaNmvQ7idMr8PaPGdj8S8aVZLOsIoGdpyqxFk4mbVQR7bKJydOnMlfvR46GSUhNQZIkPhW/XTVG9OYppiicOVFNwOchMS0dJeAhc9Qo0ksnseHXv2DVrAzuW1CApPjRyXrMZhsWs570gaNMMZ4hPrMQt8dLS2sLTa0dbNq+j+defoN312/E79dYNLmMj+RfsLj9fUzt9cihAQxC0NHp4AsTDNxfHOPcns2IsttB8yNEkAmTp1Bfc4rG8+cHdc4ICRqRBGnAho8+ZP4ddyLrTdQcOcjce1dxcMsHZMQaeeaxh0lJFfR7m1HNJqYkBtG7PyYpfBK58J8Jxox8uHEjA/4QiYmJtHT0sW3Hbn5YfZTn1vwbTzz+KKPKbuXtqhc4nTAD7z3gnzaD1m4/U6YWUpKbQs1/H6LqVCr2mbdwrnIvR0wGjhw6SH3dOXR6PbFo9K9HkCUunu8/uwazXuaXv3ydUaNyaWlu5fyJY9z/0BSyUuOIhbxkaAPoHM2gxdD6+/DZK4jLnUPQ6+PddR9ycM9OTBYbmXkFdDbXE3U6qKw6wWOBAP35y5FPbWNG+CySPR4yLGBMwx+ViViymVSSxrGTtUilY0hKTuLI0WN89WtP0djawmuv/JxY9A+e8zWtcURHzO9289avf018fDzf/uY/U1AxDac+lfRUO0snpxPqbEPyO6DtNI3HTrHmv7bz+131mEoXEZV0WEwGcjOSMZtM5GRmMOByojcasackUZKXhaYoYE7Ak7+UN7bUseZXpzmzr4b+802EXE6Eq5v55ZkkmGRcagLxhaX8y9NfQ8iwecOHBP3+EZEzYoIkWSI1LQWHs59du/cg2ZNQVIXx2SbcHZ0EAyHkAQcEB3DFDKzZ4+K4PwWRkEMoomI0Gnn0i49QWjqe3t4+ejvbCAbDzJ45g+WL7sIX8BMMBlGTCmmIJPLyMR/ukETEPYApGqTDGSLoD1CeBJICF8wWfrXpY4wmK0XFJcg63V9XSZvMFhYtWYLFbOLU2bMoegsZqSl097jZfaITKRrD19ODzx9jUnEG37innI2tBhodQaJ+D729vZSWlfDUk1+muDif9IwU5s2ZyVce+3ssNhvtHV343S7agxKbu608ODOXguxEPBGBt8+LKpnZdaaHroEoqZKEYrBz+MA+ZGDBXQsxW8wIIUZk6q+ZICEEPq+HAwcP0trchKQ3MDorndSicrpspXSFDPS3tdLd3E1jfRue3l6+c38pE9MVXn1nI71OD86+fhobm8nMyWXpsuVUjB/P3XcvwWiJp7m5HWe/D48q8f7uw1QkhvnG7Hj6ep1caO6ju9dLd0cX9X4TTkMm+qQUEo0GLDk5eFxOzp6rwef1AoxIiq5JSQ+f67yiEhYvXsIPvvd94s0GrEkpxMuCacsexHVoLR3nm3G195AQZyAaDpER0nh2YRLP/v59nu3uYfKkCagxhSOVh9iz7fd43G6qTlQz8/Y7KBlfAUYjJ6uqSK7byFPTbNQ1OvF7PLj6A3jdAYK2JAKWHIyjbofEdGSrHmdtDe/0OXjiqafYve1jWhsbRqSHRkTQ3YsWU3u2hvSUFIwWG8FAgCRZQj8mD0dtJlsP7qBw2mxKy+Jx1Jxk957TmK0WVhdk8duTW3j2nd8wYfJk9AY9mZkZTJ8xk33799LUcJ4Tp0/gbG5g2RiZ+Vmw+6iDSDRGSZ6dsbOmse9kN40XOiB9MoHCClJtKvasTOTkZHxeL+5+F2XjK2htbPjLS5CmaQidjnHl5ezavpPx48qoa+3i/JH92Ior0JvTaPUo9Nsn8w8rF5EW7sFqkvCEqnn7TIy6E73ExZsZlZGEo7eHopJynv73p+lx9NMWjJGTm07Djp0Y1ShVfTKHOzUmJ8fxQLmegoklWFIzmF44ldeeXUcwNw4lLgHFV4+1K4ASF09mehrNTc2MLSll6zVTc40EDUtPQkIiRoMBs9nEhAkVON0+dm/6kNKFZkypYVz6NG6dZiQx0IGUko0lrCIvXkxRRYQz69cz5fY59Pb18eZr/0MwFKbqYDG+gQFifh9btlQR6HNy62230dLZy+iSIrKmTyWcpSMpsR1hkIlrbqNoxmw2hTJJ6G5CE05a93zA1KwsJk4YR2NrG3mjR4/YWbxmR1Evy6iKgtlkIiMjA6tZz4XT1YRNqWSOnUqSRU+0s4GGjhxKJB018beTNqqCBaN62PvJNkJCInf0GB5/7HFSMzOQ8vIJBaOM8vqx+T3oCwv43ne+w8uvvU44HGHxgttxhqHacYKpykmqz7Zh1rIQwRAWbzc+Vz2+g3tZ/uRT2NMyMPb1E41EkMTI7vGvmaBgMIBO1uF09VNVVcWiRXdjM5v45ZvvgCmeFLOO4/1uJsUNEA5PoLNAz60JBpq9MmPLyvnV66/xH9/9FrlLl6KOKcIYiaHv7iXjljns3f4xs6IeXnz9DQ6fPcftE8rx+HykJyVQ06hDra/nXFs/1U4TpqhKuCAV2hv44ff/DWNCMh9t2sqUyRV43C6i0ZGlxFw1QZqmIQmB3zeA1+tB1TSqT1SjxaJ09ziw6gWOjkaklDSaWly87w9gPKeQON6KXoIxBQWMyc3h4WWLCaemoRtdyG1WPWPGZGOeUMy5hkbOJyfQas0lePwYtmiI6bfcgsfjpr6ujqOHD+CvrafVFaQprKEfNxrnhZPkubqpOXeexMwgjU3NzJszi7Mnq/46jqI2yBSbN25g8ZLF1Naf58TJU4wePRqzxUyosYqeljrUSJA2SzG6wpmcP9/Mz372M5yOXpRQkFFjy+hITOfORCvjRo/GGhdHj9PJ22+9zTPTxpGSmoqWX0ZRbg5FhfnU157h7bfeoq6lk5PkUePVQyxIsL0Oddu7ZKekYLMnsun32ykuzMdmNXH8yCFgZEmh10bQ0K7s3rWTlqZGVqy4j7aubrJz81iyZCkzZ87imX94kH//0Q8oKcpHicX4ytefZNasW/nvl17C0d1Ja0ShJDuLTJsNVZI4XHmEL37pccZPn0VFeRlTc9IIGgxIVgsX6uo4duw4qx5+hIVLlpNsNbBo/q08/fij3FOeQ+m4CuYtvJtO1UhY07jn7jvYumUzbS0tfzLfvxhBMGTNVIUXnv8JApW58+ezaes2gopK6YRJFJeWs3r1atb84PvEGVQ8fd2sfuBB4hIS2bF9B/6YSrDfjc/vJxZTqKk7z5iiscybOweXx0ssEAQthsfrZcfOHSy/9z6WLl6MVVa4depE/s+aH7FsyUImTp9FQcU09jT0cq6xma88/Hds3bKZjR9+MOIwY0QEadrgHXnA7+f5//wJVquZrKxM9u3ejcvRS1XVMTZu3Ex+YSFffOQRdm7byu59B8jMGYPHH2CgpQm3ZMLvD+Aa8LNo6VK+/73v4AsEGPAO4JN0iFiU5toaTBYrqZm57P7kE5obzvO1r32VvFF5VJ8+S2NDAz3trbRdqKcoxY4GrF/3LvLQ28S/arCqweBrTUXB7fFgMprIzs4i6vORZDJxpqaGzZs2M3fuXMrLxvLhB+tw9LkwWmy0nTxB9cGDHAtLuDrb8Xu9REIhfL29NEdUKi800nviONFYDIstiZ2f7GXde+8xfcZ0xo4dy6ZNm3F0tZMsq8SCIRJMBswmE75gaDBJAhhBhu/1IWgwS2NQjGPRKAiJUCDM5oiRbYqBBJ2Ofo+HHoeTCRVT8Ln7OHuqCoPRTO35enp3bOE3eyrZ64NGj5+qxlYaZDOvn6yjbutmes+ewhhnp6u7m+OVh9C0GOXlE+h3e+js7MBmMPKRZuaEiMMo6YiPs9Lv7kdV1aGskpGnS4w8w2zIs+7s6mbKlFswyjLyE//EwX6VMVUfET5bgxA6An4/VquV+guNmIxmFL2J2qpKPC4Xr9fOJLWoGFmWcfd9Ql/lPjwX6lAkPaoqaG1uIhT0cdvsWbS1tXOhsZHullZO+QVNyx4jqbSW6G9eJD83hw8+eh8YmWK+GCMmSFVVBFB5cD/L71tJVk4miacu4LRM5HjUSOhENS6fHyUaQ9MgFAwQDPjBFEeCPQ45FqJ1y3t0CAlkCVVRMJgtFOTm0djrot/RQyjgRSfL+PxBqo5X0dfXS19fL8eTJkCDTEavk8z0JJJSEjl59AhCXPaS8IoxYoI0dTBpyu3s4+SJaqZMnkpbTRV9D82kpy5IUlsHHk0m7Pfh6HMSURWUcJiw3ow5NY3VC+/gXEMjHV3dhEJB7HY7JYVFiFiE2h17CYbCKFoMs8VGY1MzwWCAcDjEgMuNo3A2tlIztp37WXjnfHZt+5iw38fg9fv/IxIEoAwlVv7mtVd54aWXKWtopPe5bxHubSNqNNLR1Ih/YICA1Y5mSUBVI4iCiXj8DvJycrhr0SKamppx9bvJzcvCYDCxe8tGXOY4RGYxWncDEZud7l4nYa8LU3wi4VAIy45d5Lc2MzkrDtlsYsO694ayza5fqtb1yXIdMvn+AS+/ePnnfP3pf8Tz298RGJWLJ6qiGoOEplaAxUDk9FGU8nmkpZrI3vchTe3dlE2cyPRpk5FkGZ0Q1DU209HZQ1a8Cee8+wgeOYBQ+ogUTCXo6sbsd2JKzaZCREiRIsyeu4D//OlzBIbSW64nrlvKujZk0SoPH2Dd+++yYOkSzMlphGMxfKXlBIvHEKk7QlZuBlNGGXH8/EeMyc4jKunZuvsg3b1OrGYj7b19bN97iMTRxWT73CTsf4uS6WXowj4ivi58U2fQo9fhNJix2e0svX0Wb6xdS/Xx4yO+wfgsXPc8aSFJfPTB+7jd/cyePYeMBBPGlGQ0Zz1SxXji7PHEaX6y5y1gx549JOePxeNwYUluwGgwsOHISZq8QXRKDJdngPvmzCJVePHPnUvQ7UR1nkWtKMYSi5CckMAvXvk5x46O/A7+c9dzif+ueSuGv8SxJyZSPm4CdpsNndlMOBKhtbkJXyDAyi+sQo0qnG/rpLqmjhkLF7HyC6v4n5d/jru9FW93K/NnTKfb0cep6mNkZKSTnpmDWa8jqsTwxVQq9+7G53Ez/EHdCHHVDGsjKZIkX/J/g8Gg3b/q77Rf/+4dbcFdizVT+ijtiy+9qZlSczWzLUErKCzW8otKLjuOLF96nKsoV83aiA/zsJc9rBcuPgbDfkpWVjZPP/MvVFadYOfBSjS3A53QkPV6PC4n0ViUi7/uubiv6xFrXTzdK64cnsv1GvnzMLxIe1ISX3vqn4j4/bzzzu/o7urCaDQSi0UJh8M3ehp/mM7VPnC9RPcyR1HSAM1sNmvTZ87SjEbjH+qFEH+ROfDXOmJXihthnq9lGp9V+Zf7dO8SGPahZFm+fOObuImbuImbuImbuEL8XyshqFsbAIvEAAAAAElFTkSuQmCC'
const fmt = (ms) => {
  const negative = ms < 0 ? '-' : ''
  const secs = Math.floor(Math.abs(ms) / 1000)
  return `${negative}${String(Math.floor(secs / 3600)).padStart(2, '0')}:${String(Math.floor(secs / 60) % 60).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
}
// MM:SS or HH:MM:SS; no ambiguous plain seconds input.
export function parseDuration(value) {
  const input = String(value ?? '').trim()
  const parts = input.split(':')
  if (parts.length !== 2 && parts.length !== 3) throw new Error('Use MM:SS or HH:MM:SS (e.g. 05:00 or 01:05:22)')
  if (!parts.every(part => /^\d+$/.test(part))) throw new Error('Time must contain digits and colons only')
  if (parts.slice(1).some(part => part.length !== 2)) throw new Error('Minutes/seconds must have two digits')
  const nums = parts.map(Number)
  if (parts.length === 2) {
    if (nums[1] > 59) throw new Error('Seconds must be 00–59')
    return nums[0] * 60 + nums[1]
  }
  if (nums[1] > 59 || nums[2] > 59) throw new Error('Minutes and seconds must be 00–59')
  return nums[0] * 3600 + nums[1] * 60 + nums[2]
}
const colorNumber = (hex, fallback = 0x232b36) => /^#[0-9a-f]{6}$/i.test(hex || '') ? parseInt(hex.slice(1), 16) : fallback
const timerColor = (state) => {
  if (!state?.settings) return 0xffffff
  const s = state.settings
  let hex = s.white || '#ffffff'
  if (!state.forceWhite && s.automaticColors && state.mode === 'down') {
    hex = state.ms <= Number(s.redAt) * 1000 ? s.red : state.ms <= Number(s.yellowAt) * 1000 ? s.yellow : s.green
  }
  if (String(hex).toLowerCase() === String(s.background).toLowerCase()) hex = String(hex).toLowerCase() === '#ffffff' ? '#000000' : '#ffffff'
  return colorNumber(hex, 0xffffff)
}
const presentationBackground = (state) => colorNumber(state?.settings?.background, 0x000000)

const splitTime = (ms) => {
  const total = Math.floor(Math.abs(Number(ms) || 0) / 1000)
  return { hours: String(Math.floor(total / 3600)).padStart(2, '0'), minutes: String(Math.floor(total / 60) % 60).padStart(2, '0'), seconds: String(total % 60).padStart(2, '0') }
}
const durationField = { id: 'duration', type: 'textinput', label: 'Duration (MM:SS or HH:MM:SS)', default: '05:00', useVariables: false }

export default class MoosTimer extends InstanceBase {
  async init(config) {
    this.config = config
    this.state = null
    this.pollTimer = null
    this.inFlight = false
    this.presetSignature = null
    this.initActions()
    this.initFeedbacks()
    this.initVariables()
    this.initPresets()
    this.startPolling()
  }
  async destroy() {
    clearInterval(this.pollTimer)
    this.pollTimer = null
  }
  getConfigFields() {
    return [
      { type: 'textinput', id: 'host', label: 'MoosTimer IP address or hostname', width: 8, default: '127.0.0.1', regex: Regex.HOSTNAME },
      { type: 'number', id: 'port', label: 'Port', width: 4, default: 3950, min: 1, max: 65535 },
    ]
  }
  async configUpdated(config) {
    this.config = config
    this.state = null
    this.startPolling()
  }
  get baseUrl() {
    const host = String(this.config?.host || '127.0.0.1').trim()
    const port = Number(this.config?.port || 3950)
    return `http://${host}:${port}`
  }
  async request(path, body) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 1800)
    try {
      const res = await fetch(this.baseUrl + path, body ? {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal,
      } : { signal: ctrl.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`)
      return await res.json()
    } finally { clearTimeout(timer) }
  }
  async command(action, data = {}) {
    try {
      const state = await this.request('/api/action', { action, ...data })
      this.updateState(state)
    } catch (e) {
      this.log('error', `Command ${action} failed: ${e.message}`)
      this.updateStatus(InstanceStatus.ConnectionFailure, e.message)
    }
  }
  updateState(state) {
    this.state = state
    this.updateStatus(InstanceStatus.Ok)
    this.setVariableValues({
      remaining: fmt(state.ms || 0),
      remaining_seconds: String(Math.round((state.ms || 0) / 1000)),
      mode: state.mode || '',
      display_mode: state.displayMode || '',
      running: state.running ? 'Running' : 'Paused',
      blinking: state.blinking ? 'Yes' : 'No',
      end_time: state.endTime ? new Date(state.endTime).toLocaleTimeString('de-DE') : '—',
      preset_count: String(state.presets?.length || 0),
      hours: splitTime(state.ms).hours,
      minutes: splitTime(state.ms).minutes,
      seconds: splitTime(state.ms).seconds,
      timer_color: '#' + timerColor(state).toString(16).padStart(6, '0'),
      logo_visible: state.settings?.showLogo ? 'Yes' : 'No',
      paused: state.running ? 'No' : 'Yes',
    })
    this.checkFeedbacks('running', 'paused', 'display', 'blinking', 'countmode', 'timercolor', 'logo', 'message')
    const signature = JSON.stringify((state.presets || []).map(p => [p.name, p.seconds]))
    if (signature !== this.presetSignature) {
      this.presetSignature = signature
      this.initPresets()
    }
  }
  startPolling() {
    clearInterval(this.pollTimer)
    this.updateStatus(InstanceStatus.Connecting)
    const poll = async () => {
      if (this.inFlight) return
      this.inFlight = true
      try { this.updateState(await this.request('/api/state')) }
      catch (e) { this.state = null; this.updateStatus(InstanceStatus.ConnectionFailure, e.message); this.checkFeedbacks('running', 'paused', 'display', 'blinking', 'countmode', 'timercolor', 'logo', 'message') }
      finally { this.inFlight = false }
    }
    void poll()
    this.pollTimer = setInterval(poll, 300)
  }
  initActions() {
    const simple = [
      ['start', 'Start timer'], ['pause', 'Pause timer'], ['toggle', 'Start / pause'],
      ['reset', 'Reset immediately (no confirmation)'], ['blink', 'Toggle blink'], ['white', 'Toggle force white'],
    ]
    const actions = Object.fromEntries(simple.map(([id, name]) => [id, { name, options: [], callback: () => this.command(id) }]))
    actions.message = {name:'Toggle message',options:[],callback:()=>this.command('toggleMessage')}
    actions.message_show = {name:'Show message',options:[],callback:()=>this.command('showMessage')}
    actions.message_hide = {name:'Hide message',options:[],callback:()=>this.command('hideMessage')}
    actions.message_send = {name:'Send message',options:[{id:'text',type:'textinput',label:'Message',default:'',useVariables:false}],callback:ev=>this.command('sendMessage',{text:String(ev.options.text)})}
    actions.logo = { name: 'Toggle presentation logo (requires MoosTimer 1.0.12+)', options: [], callback: () => this.command('toggleLogo') }
    // Toggle between fullscreen logo and the regular timer view.
    actions.logo_test_toggle = {
      name: 'Toggle fullscreen logo test / timer', options: [],
      callback: () => this.command('displayMode', { displayMode: this.state?.displayMode === 'logo' ? 'timer' : 'logo' }),
    }
    actions.countmode_toggle = {
      name: 'Toggle countdown / count up', options: [],
      callback: () => this.command('mode', { mode: this.state?.mode === 'up' ? 'down' : 'up' }),
    }
    actions.display = {
      name: 'Set presentation display mode',
      options: [{ id: 'displayMode', type: 'dropdown', label: 'Display', default: 'timer', choices: [
        { id: 'timer', label: 'Timer' }, { id: 'clock', label: 'Clock' }, { id: 'blackout', label: 'Blackout' }, { id: 'logo', label: 'Logo fullscreen test' },
      ] }],
      callback: (ev) => this.command('displayMode', { displayMode: ev.options.displayMode }),
    }
    actions.countmode = {
      name: 'Set count direction',
      options: [{ id: 'mode', type: 'dropdown', label: 'Direction', default: 'down', choices: [
        { id: 'down', label: 'Countdown' }, { id: 'up', label: 'Count up' },
      ] }],
      callback: (ev) => this.command('mode', { mode: ev.options.mode }),
    }
    actions.adjust = {
      name: 'Adjust time',
      options: [
        { ...durationField, default: '01:00', label: 'Adjustment (MM:SS or HH:MM:SS)' },
        { id: 'direction', type: 'dropdown', label: 'Direction', default: 'add', choices: [
          { id: 'add', label: 'Add time (+)' }, { id: 'subtract', label: 'Subtract time (-)' },
        ] },
      ],
      callback: (ev) => {
        try {
          const seconds = parseDuration(ev.options.duration)
          if (seconds > 86400) throw new Error('Adjustment may not exceed 24 hours')
          return this.command('adjust', { seconds: ev.options.direction === 'subtract' ? -seconds : seconds })
        } catch (e) { this.log('error', `Invalid time adjustment: ${e.message}`) }
      },
    }
    actions.set = {
      name: 'Set timer duration',
      options: [{ ...durationField }],
      callback: (ev) => {
        try {
          const seconds = parseDuration(ev.options.duration)
          if (seconds > 359999) throw new Error('Duration exceeds supported maximum')
          return this.command('set', { seconds })
        } catch (e) { this.log('error', `Invalid timer duration: ${e.message}`) }
      },
    }
    actions.preset = {
      name: 'Load MoosTimer preset by name',
      options: [{ id: 'name', type: 'textinput', label: 'Exact preset name', default: '5 Minuten', useVariables: false }],
      callback: (ev) => this.command('preset', { name: String(ev.options.name) }),
    }
    actions.profile = {
      name: 'Load event profile by name',
      options: [{ id: 'name', type: 'textinput', label: 'Exact profile name', default: '', useVariables: false }],
      callback: (ev) => this.command('loadProfile', { name: String(ev.options.name) }),
    }
    this.setActionDefinitions(actions)
  }
  initFeedbacks() {
    const bool = (name, callback) => ({ type: 'boolean', name, defaultStyle: { bgcolor: 0x168a58, color: 0xffffff }, options: [], callback })
    this.setFeedbackDefinitions({
      running: bool('Timer is running', () => !!this.state?.running),
      blinking: bool('Timer is blinking', () => !!this.state?.blinking),
      paused: bool('Timer is paused', () => !!this.state && !this.state.running),
      message: bool('Message is visible',()=>!!this.state?.messageVisible),
      logo: bool('Presentation logo is visible', () => !!this.state?.settings?.showLogo),
      timercolor: {
        type: 'advanced', name: 'Live timer color (uses presentation colors)', options: [],
        callback: () => ({ bgcolor: presentationBackground(this.state), color: timerColor(this.state) }),
      },
      display: {
        ...bool('Selected presentation mode is active', (ev) => this.state?.displayMode === ev.options.mode),
        options: [{ id: 'mode', type: 'dropdown', label: 'Mode', default: 'timer', choices: [
          { id: 'timer', label: 'Timer' }, { id: 'clock', label: 'Clock' }, { id: 'blackout', label: 'Blackout' }, { id: 'logo', label: 'Logo fullscreen test' },
        ] }],
      },
      countmode: {
        ...bool('Selected count direction is active', (ev) => this.state?.mode === ev.options.mode),
        options: [{ id: 'mode', type: 'dropdown', label: 'Mode', default: 'down', choices: [
          { id: 'down', label: 'Countdown' }, { id: 'up', label: 'Count up' },
        ] }],
      },
    })
  }
  initVariables() {
    this.setVariableDefinitions({
      remaining: { name: 'Formatted remaining time' },
      remaining_seconds: { name: 'Remaining seconds' },
      mode: { name: 'Count direction' },
      display_mode: { name: 'Display mode' },
      running: { name: 'Run status' },
      blinking: { name: 'Blink status' },
      end_time: { name: 'End time' },
      preset_count: { name: 'Number of presets' },
      hours: { name: 'Hours (HH)' },
      minutes: { name: 'Minutes (MM)' },
      seconds: { name: 'Seconds (SS)' },
      timer_color: { name: 'Timer color (hex)' },
      logo_visible: { name: 'Presentation logo visible' },
      paused: { name: 'Paused status' },
    })
  }
  initPresets() {
    const white = 0xffffff, dark = 0x232b36, green = 0x168a58
    const make = (name, text, actionId, actionOptions = {}, feedbackId, feedbackOptions = {}) => ({
      type: 'simple', name,
      style: { text, size: 'auto', color: white, bgcolor: dark },
      steps: [{ down: [{ actionId, options: actionOptions }], up: [] }],
      feedbacks: feedbackId ? [{ feedbackId, options: feedbackOptions, style: { bgcolor: green, color: white } }] : [],
    })
    const time = (name, text) => ({
      type: 'simple', name,
      style: { text, size: 'auto', color: white, bgcolor: 0x000000 },
      steps: [{ down: [], up: [] }],
      feedbacks: [{ feedbackId: 'timercolor', options: {} }],
    })
    const presets = {
      message: make('Toggle message','MESSAGE','message',{},'message'),
      message_show: make('Show message','SHOW MSG','message_show',{},'message'),
      message_hide: make('Hide message','HIDE MSG','message_hide'),
      start: make('Start', '▶ START', 'start', {}, 'running'),
      pause: make('Pause', 'Ⅱ PAUSE', 'pause', {}, 'paused'),
      toggle: make('Start / Pause', 'START / PAUSE', 'toggle', {}, 'running'),
      reset: make('Reset immediately', '↺ RESET', 'reset'),
      timer: make('Timer display', 'TIMER', 'display', { displayMode: 'timer' }, 'display', { mode: 'timer' }),
      clock: make('Clock display', 'UHRZEIT', 'display', { displayMode: 'clock' }, 'display', { mode: 'clock' }),
      blackout: make('Blackout', 'BLACKOUT', 'display', { displayMode: 'blackout' }, 'display', { mode: 'blackout' }),
      blink: make('Blink', 'BLINKEN', 'blink', {}, 'blinking'),
      white: make('Force white', 'WEISS', 'white'),
      logo: { ...make('Toggle small presentation logo', '', 'logo', {}, 'logo'), style: { text: '', size: 'auto', color: white, bgcolor: 0x000000, png64: logoPng } },
      logo_test: { ...make('Fullscreen logo signal test (toggle)', '', 'logo_test_toggle', {}, 'display', { mode: 'logo' }), style: { text: '', size: 'auto', color: white, bgcolor: 0x000000, png64: logoTestPng } },
      plus60: make('+1 minute', '+1 MIN', 'adjust', { duration: '01:00', direction: 'add' }),
      minus60: make('-1 minute', '-1 MIN', 'adjust', { duration: '01:00', direction: 'subtract' }),
      plus10: make('+10 seconds', '+10 SEK', 'adjust', { duration: '00:10', direction: 'add' }),
      minus10: make('-10 seconds', '-10 SEK', 'adjust', { duration: '00:10', direction: 'subtract' }),
      endtime: { type: 'simple', name: 'Expected end time', style: { text: 'ENDE\n$(moostimer:end_time)', size: 'auto', color: white, bgcolor: dark }, steps: [{ down: [], up: [] }], feedbacks: [] },
      countmode_toggle: {
        ...make('Count Up/Down', 'Count Up/Down', 'countmode_toggle'),
        style: { text: 'Count Up/Down', size: 'auto', color: white, bgcolor: 0x000000 },
        feedbacks: [
          { feedbackId: 'countmode', options: { mode: 'up' }, style: { bgcolor: 0xb72c35, color: white } },
          { feedbackId: 'countmode', options: { mode: 'down' }, style: { bgcolor: green, color: white } },
        ],
      },
      countmode_up: { ...make('Count Up', 'Count Up', 'countmode', { mode: 'up' }, 'countmode', { mode: 'up' }), style: { text: 'Count Up', size: 'auto', color: white, bgcolor: 0x000000 } },
      countmode_down: { ...make('Count Down', 'Count Down', 'countmode', { mode: 'down' }, 'countmode', { mode: 'down' }), style: { text: 'Count Down', size: 'auto', color: white, bgcolor: 0x000000 } },
      time: time('Full live timer', '$(moostimer:remaining)'),
      hours: time('Hours', '$(moostimer:hours)'),
      minutes: time('Minutes', '$(moostimer:minutes)'),
      seconds: time('Seconds', '$(moostimer:seconds)'),
    }
    const fixed = [['5 Minuten',300],['10 Minuten',600],['15 Minuten',900],['20 Minuten',1200],['30 Minuten',1800],['45 Minuten',2700],['60 Minuten',3600]]
    for (const [name, seconds] of fixed) {
      const key = `fixed_${seconds}`
      const duration = `${String(Math.floor(seconds / 60)).padStart(2,'0')}:00`
      presets[key] = make(name, name.toUpperCase(), 'set', { duration })
    }
    const dynamic = []
    for (const [index, item] of (this.state?.presets || []).entries()) {
      if (!item || typeof item.name !== 'string' || !item.name.trim()) continue
      const key = `saved_${index}`
      presets[key] = make(`Saved: ${item.name}`, item.name, 'preset', { name: item.name })
      dynamic.push(key)
    }
    const sections = [
      { id: 'transport', name: 'Timersteuerung', definitions: ['start', 'pause', 'toggle', 'reset', 'countmode_toggle', 'countmode_up', 'countmode_down'] },
      { id: 'display', name: 'Anzeige', definitions: ['timer', 'clock', 'blackout', 'logo_test', 'blink', 'white', 'logo', 'message', 'message_show', 'message_hide'] },
      { id: 'adjustments', name: 'Zeitkorrektur', definitions: ['plus60', 'minus60', 'plus10', 'minus10'] },
      { id: 'status', name: 'Live-Zeitanzeige', definitions: ['time', 'hours', 'minutes', 'seconds', 'endtime'] },
      { id: 'fixed', name: 'Feste Zeiten', definitions: fixed.map(([,seconds]) => `fixed_${seconds}`) },
      { id: 'saved', name: 'Gespeicherte MoosTimer-Presets', definitions: dynamic },
    ]
    this.setPresetDefinitions(sections, presets)
  }
}
