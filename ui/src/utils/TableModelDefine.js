const imageColumns = [
    {
        title: '镜像 Id',
        key: 'imageId',
        fixed: 'left',
        dataIndex: 'imageId',
    },
    {
        title: '镜像 Tag',
        dataIndex: 'rep',
        key: 'rep',
    },

    {
        title: '镜像大小',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: '创建时间',
        key: 'created',
        dataIndex: 'created'

    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: '50px',
        scopedSlots: {customRender: 'action'},
    },
];

const defaultTemplateColumn = [
    {
        title: '配置名称',
        key: 'name',
    },
    {
        title: '镜像名称',
        key: 'name',
    },
    {
        title: '镜像版本',
        key: 'version',
    },
    {
        title: '创建时间',
        key: 'createdAt',
    },
    {
        title: '操作',
        fixed: 'right',
        key: 'createdAt',
        scopedSlots: {customRender: 'action'},
    },
]

// eslint-disable-next-line no-undef
module.exports = {
    imageColumns: imageColumns,
    defaultTemplateColumn: defaultTemplateColumn
}