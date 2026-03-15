import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { classActions } from '../redux/actions/class.actions';
import { Class } from '../types/class.modals';
import ClassForm from '../components/Forms/ClassForm';
import GenericModal from '../components/GenericModal';
import { ReusableDataGrid } from '../components/ReusableDataGrid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

function ClassesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.classes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);
  const [isTransferStudentModalOpen, setIsTransferStudentModalOpen] = useState(false);
  const [transferStudentData, setTransferStudentData] = useState({
    studentId: '',
    fromClassId: '',
    toClassId: '',
  });
  const [filterAcademicYear, setFilterAcademicYear] = useState('');
  const [filterTeacherId, setFilterTeacherId] = useState('');
  const [filterCourseId, setFilterCourseId] = useState('');

  // Get teachers, courses, and students from Redux store
  const { courses } = useSelector((state: RootState) => state.course);
  const { data: teachersData } = useSelector((state: RootState) => state.teacher);
  const { data: studentsData } = useSelector((state: RootState) => state.student);

  const teachers = teachersData?.teachers || [];
  const students = studentsData?.students || [];

  useEffect(() => {
    dispatch(classActions.getClasses());
  }, [dispatch]);

  const handleAddClass = () => {
    setIsEditMode(false);
    setSelectedClass(null);
    setIsModalOpen(true);
  };

  const handleEditClass = (classData: Class) => {
    setIsEditMode(true);
    setSelectedClass(classData);
    setIsModalOpen(true);
  };

  const handleDeleteClass = (id: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      dispatch(classActions.deleteClass(id));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleBulkUpload = () => {
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    dispatch(classActions.bulkCreateClasses(formData));
    setIsBulkUploadModalOpen(false);
    setSelectedFile(null);
  };

  const handleTransferStudent = () => {
    if (!transferStudentData.studentId || !transferStudentData.fromClassId || !transferStudentData.toClassId) {
      alert('Please fill all fields');
      return;
    }
    
    dispatch(classActions.transferStudent(transferStudentData));
    setIsTransferStudentModalOpen(false);
    setTransferStudentData({ studentId: '', fromClassId: '', toClassId: '' });
  };

  const handleFilterByAcademicYear = () => {
    if (filterAcademicYear) {
      dispatch(classActions.getClassesByAcademicYear(filterAcademicYear));
    } else {
      dispatch(classActions.getClasses());
    }
  };

  const handleFilterByTeacher = () => {
    if (filterTeacherId) {
      dispatch(classActions.getClassesByTeacher(filterTeacherId));
    } else {
      dispatch(classActions.getClasses());
    }
  };

  const handleFilterByCourse = () => {
    if (filterCourseId) {
      dispatch(classActions.getClassesByCourse(filterCourseId));
    } else {
      dispatch(classActions.getClasses());
    }
  };

  const handleFormSubmit = (formData: any) => {
    if (isEditMode && selectedClass) {
      dispatch(classActions.updateClass(formData, selectedClass._id));
    } else {
      dispatch(classActions.createClass(formData));
    }
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
  };

  const columns = [
    { field: 'name', headerName: 'Class Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'courseId', headerName: 'Course', width: 150 },
    { field: 'classTeacherId', headerName: 'Class Teacher', width: 150 },
    { field: 'departmentId', headerName: 'Department', width: 150 },
    { field: 'academicYear', headerName: 'Academic Year', width: 150 },
    { field: 'credits', headerName: 'Credits', width: 100 },
    { field: 'maxCapacity', headerName: 'Max Capacity', width: 120 },
    { field: 'currentEnrollment', headerName: 'Current Enrollment', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            color="primary"
            onClick={() => handleEditClass(params.row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => handleDeleteClass(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h1">
              Classes Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage and organize classes in the system
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setIsBulkUploadModalOpen(true)}
                startIcon={<CloudUploadIcon />}
              >
                Bulk Upload
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsTransferStudentModalOpen(true)}
              >
                Transfer Student
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddClass}
              >
                Add Class
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Academic Year</InputLabel>
              <Select
                value={filterAcademicYear}
                onChange={(e) => setFilterAcademicYear(e.target.value)}
                label="Filter by Academic Year"
                onClose={handleFilterByAcademicYear}
              >
                <MenuItem value="">All Years</MenuItem>
                {/* Add academic year options based on your data */}
                <MenuItem value="2023-2024">2023-2024</MenuItem>
                <MenuItem value="2024-2025">2024-2025</MenuItem>
                <MenuItem value="2025-2026">2025-2026</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Teacher</InputLabel>
              <Select
                value={filterTeacherId}
                onChange={(e) => setFilterTeacherId(e.target.value)}
                label="Filter by Teacher"
                onClose={handleFilterByTeacher}
              >
                <MenuItem value="">All Teachers</MenuItem>
                {teachers.map((teacher) => (
                  <MenuItem key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Filter by Course</InputLabel>
              <Select
                value={filterCourseId}
                onChange={(e) => setFilterCourseId(e.target.value)}
                label="Filter by Course"
                onClose={handleFilterByCourse}
              >
                <MenuItem value="">All Courses</MenuItem>
                {/* {courses?.map((course) => (
                  <MenuItem key={course._id} value={course._id}>
                    {course._id}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <ReusableDataGrid
        columns={columns}
        rows={data?.classes || []}
        onAdd={handleAddClass}
        onEdit={handleEditClass}
        onView={(id) => console.log('View class:', id)}
        onDelete={handleDeleteClass}
        rowModesModel={{}}
        setRowModesModel={() => {}}
        loading={loading}
        reloadData={() => dispatch(classActions.getClasses())}
        totalRows={data?.total || 0}
        paginationModel={{
          page: 0,
          pageSize: 10,
        }}
        onParamsChange={(params) => {
          console.log('Params change:', params);
        }}
        enableSearch={true}
        enableFilters={true}
        enableSorting={true}
        searchPlaceholder="Search classes..."
        pageSizeOptions={[5, 10, 25, 50, 100]}
      />

      <GenericModal
        open={isModalOpen}
        title={isEditMode ? 'Edit Class' : 'Add Class'}
        onClose={handleModalClose}
      >
        <ClassForm
          initialValues={selectedClass || undefined}
          onSubmit={handleFormSubmit}
          onClose={handleModalClose}
        />
      </GenericModal>

      {/* Bulk Upload Modal */}
      <GenericModal
        open={isBulkUploadModalOpen}
        title="Bulk Upload Classes"
        onClose={() => {
          setIsBulkUploadModalOpen(false);
          setSelectedFile(null);
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Upload an Excel file to create multiple classes. Please use the template provided.
          </Typography>
          <input
            accept=".xlsx,.xls,.csv"
            type="file"
            hidden
            id="file-input"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{ mb: 2 }}
            >
              {selectedFile ? selectedFile.name : 'Select File'}
            </Button>
          </label>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setIsBulkUploadModalOpen(false);
                setSelectedFile(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBulkUpload}
              disabled={!selectedFile}
            >
              Upload
            </Button>
          </Box>
        </Box>
      </GenericModal>

      {/* Transfer Student Modal */}
      {/* <GenericModal
        open={isTransferStudentModalOpen}
        title="Transfer Student"
        onClose={() => {
          setIsTransferStudentModalOpen(false);
          setTransferStudentData({ studentId: '', fromClassId: '', toClassId: '' });
        }}
      >
        <Box sx={{ p: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Student</InputLabel>
            <Select
              value={transferStudentData.studentId}
              onChange={(e) => setTransferStudentData({ ...transferStudentData, studentId: e.target.value })}
              label="Select Student"
            >
              {students.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select the student to transfer</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>From Class</InputLabel>
            <Select
              value={transferStudentData.fromClassId}
              onChange={(e) => setTransferStudentData({ ...transferStudentData, fromClassId: e.target.value })}
              label="From Class"
            >
              {data?.classes?.map((cls) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select the current class</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>To Class</InputLabel>
            <Select
              value={transferStudentData.toClassId}
              onChange={(e) => setTransferStudentData({ ...transferStudentData, toClassId: e.target.value })}
              label="To Class"
              disabled={!transferStudentData.fromClassId}
            >
              {data?.classes?.filter((cls) => cls._id !== transferStudentData.fromClassId).map((cls) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select the destination class</FormHelperText>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setIsTransferStudentModalOpen(false);
                setTransferStudentData({ studentId: '', fromClassId: '', toClassId: '' });
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTransferStudent}
              disabled={!transferStudentData.studentId || !transferStudentData.fromClassId || !transferStudentData.toClassId}
            >
              Transfer
            </Button>
          </Box>
        </Box>
      </GenericModal> */}
    </Box>
  );
}

export default ClassesPage;
