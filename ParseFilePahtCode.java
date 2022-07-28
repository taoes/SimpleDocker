--ls -lashi
public static void main(String[] args) {
        List<String> fileInfo = new ArrayList<>();
        for (String line : fileInfo) {
            final String[] data = line.split(" ");
            if (data.length < 9) {
                continue;
            }
            Long size = Long.valueOf(data[4]);
            String name = data[8];
            String ty = data[7];
            String time = "";
            String year = "";
            if (ty.contains(":")) {
                time = ty;
                year = String.valueOf(LocalDateTime.now().getYear());
            } else {
                year = ty;
                time = "00:00";
            }
            String day = data[6];
            if (day.length() == 1) {
                day = "0" + day;
            }

            String month = data[5];


            final File file = new File();
            file.name = name;
            file.permission = data[0];
            file.owner = data[2];
            file.group = data[3];
            file.size = size;
            file.modifyTime = year + month + day + time;
        }
    }

    static class File {
        private String name;
        private String permission;
        private String owner;
        private String group;
        private Long size;
        private String modifyTime;
    }