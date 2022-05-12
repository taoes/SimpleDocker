export default interface InspectVolume {

    Name: string;

    Labels: Map<String, String>;

    Driver: string;

    Mountpoint: string;

    Options: Map<String, String>;

    CreatedAt: string;


    Scope: string;

}